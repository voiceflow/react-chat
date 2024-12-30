import { VOICE_STATE, VoiceState } from '@/constant/voice.constant';

export interface VoiceControllerOptions {
  url: string;
  userID?: string;
  accessToken: string;
  assistantID: string;
}

export class VoiceController {
  url: string;

  state: string = VOICE_STATE.IDLE;

  userID = 'test';

  listeners: Array<(state: VoiceState) => void> = [];

  accessToken: string;

  assistantID: string;

  webSocket: WebSocket | null = null;

  lastMarkIndex = 0;

  lastSentMarkIndex = 0;

  audioQueue = Promise.resolve();

  talkingTimeout: NodeJS.Timeout | null = null;

  inputAudioStream: MediaStream | null = null;

  mediaRecorder: MediaRecorder | null = null;

  currentAudioElement: {
    outputAudioElement: HTMLAudioElement;
    outputSourceBuffer: SourceBuffer | null;
  } = {
    outputAudioElement: new Audio(),
    outputSourceBuffer: null,
  };

  constructor({ url, userID, accessToken, assistantID }: VoiceControllerOptions) {
    this.url = `${url}/voice/socket`;
    this.userID = userID ?? this.userID;
    this.assistantID = assistantID;
    this.accessToken = accessToken;
  }

  sendMark = () => {
    if (this.lastMarkIndex === this.lastSentMarkIndex) return;

    this.lastSentMarkIndex = this.lastMarkIndex;

    this.webSocket?.send(
      JSON.stringify({
        type: 'mark',
        payload: {
          markIndex: this.lastMarkIndex,
        },
      })
    );
  };

  base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
  }

  waitForBufferUpdateEnd = (outputSourceBuffer: SourceBuffer, chunk: ArrayBuffer) =>
    new Promise((resolve, reject) => {
      function onUpdateEnd() {
        outputSourceBuffer.removeEventListener('updateend', onUpdateEnd);
        outputSourceBuffer.removeEventListener('error', onError);
        resolve(null);
      }

      function onError(error: any) {
        outputSourceBuffer.removeEventListener('updateend', onUpdateEnd);
        outputSourceBuffer.removeEventListener('error', onError);
        reject(error);
      }

      outputSourceBuffer.addEventListener('updateend', onUpdateEnd);
      outputSourceBuffer.addEventListener('error', onError);

      outputSourceBuffer.appendBuffer(chunk);
    });

  async handleIncomingChunk(base64Chunk: string, markIndex: number) {
    const { outputSourceBuffer } = this.currentAudioElement;

    if (!outputSourceBuffer) return;

    this.audioQueue = this.audioQueue.then(async () => {
      const chunkBuffer = this.base64ToArrayBuffer(base64Chunk);

      await this.waitForBufferUpdateEnd(outputSourceBuffer, chunkBuffer);

      // 3. Append buffer
      if (markIndex > this.lastMarkIndex) {
        this.lastMarkIndex = markIndex;
      }

      return undefined;
    });
  }

  clearAudio() {
    this.currentAudioElement.outputSourceBuffer?.abort();
    this.currentAudioElement.outputAudioElement.pause();
    this.currentAudioElement.outputAudioElement.currentTime = 0;
    this.currentAudioElement.outputAudioElement.src = '';

    this.sendMark();
    this.currentAudioElement = this.createAudioElement();
  }

  createAudioElement() {
    const outputAudioElement = new Audio();

    const ref: {
      outputAudioElement: HTMLAudioElement;
      outputSourceBuffer: SourceBuffer | null;
    } = {
      outputAudioElement,
      outputSourceBuffer: null,
    };

    const outputMediaSource = new MediaSource();

    outputAudioElement.src = URL.createObjectURL(outputMediaSource);

    // Flag to track if we're initialized
    let sourceOpen = false;

    // Called when outputMediaSource is ready to accept data.
    function onSourceOpen() {
      if (!sourceOpen) {
        sourceOpen = true;
        ref.outputSourceBuffer = outputMediaSource.addSourceBuffer('audio/mpeg');

        // (Optional) Set the mode to 'segments'
        // outputSourceBuffer.mode = 'segments';

        console.info('SourceBuffer created: audio/mpeg');
      }
    }

    // Listen for MediaSource to be ready
    outputMediaSource.addEventListener('sourceopen', onSourceOpen);
    outputAudioElement.addEventListener('waiting', this.sendMark);
    outputAudioElement.addEventListener('stalled', this.sendMark);
    outputAudioElement.addEventListener('timeupdate', () => {
      console.log('timeupdate', outputAudioElement.currentTime, this.state);

      if (this.state !== VOICE_STATE.TALKING && outputAudioElement === this.currentAudioElement.outputAudioElement) {
        this.updateState(VOICE_STATE.TALKING);
      }

      if (this.talkingTimeout) {
        clearTimeout(this.talkingTimeout);
      }

      this.talkingTimeout = setTimeout(() => {
        this.updateState(VOICE_STATE.LISTENING);
        this.talkingTimeout = null;
      }, 500);
    });

    outputAudioElement.play();

    return ref;
  }

  async startInputStream() {
    try {
      this.inputAudioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    } catch (e) {
      return console.error('Microphone access denied.', e);
    }

    console.info('Got audio stream:', this.inputAudioStream);

    this.mediaRecorder = new MediaRecorder(this.inputAudioStream);

    console.info('Got media recorder:', this.mediaRecorder);

    this.mediaRecorder.addEventListener('dataavailable', (event) => {
      if (event.data.size > 0 && this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
        this.webSocket.send(event.data);
      }
    });

    this.mediaRecorder.addEventListener('error', (event) => {
      console.error('MediaRecorder error:', event.error);
    });

    this.mediaRecorder.start(500);
    console.info('Started audio streaming...');

    return this.inputAudioStream;
  }

  stopInputStream() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    if (this.inputAudioStream) {
      this.inputAudioStream.getTracks().forEach((track) => track.stop());
    }

    console.info('Stopped audio streaming.');
  }

  initWebSocket = () =>
    new Promise((resolve) => {
      if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
        return;
      }

      this.webSocket = new WebSocket(this.url);

      this.webSocket.onopen = () => {
        console.info('WebSocket opened!');
        resolve({});
      };

      this.webSocket.onmessage = (event) => {
        // If we get a text message, treat as text/JSON
        const message = JSON.parse(event.data);

        console.info(event.data, message);

        if (message.type === 'audio') {
          this.handleIncomingChunk(message.payload.audio, message.payload.markIndex);
        } else if (message.type === 'end') {
          console.info('Conversation ended by server.', 'system');
          this.stopInputStream();
        } else if (message.type === 'interrupt') {
          this.clearAudio();
        }
      };

      this.webSocket.onclose = () => {
        console.info('WebSocket disconnected!', 'system');
      };

      this.webSocket.onerror = (err) => {
        console.error('WebSocket error:', err);
      };
    });

  async start() {
    this.updateState(VOICE_STATE.INITIALIZING);

    await this.initWebSocket();

    this.currentAudioElement = this.createAudioElement();

    const messageObj = {
      type: 'start',
      payload: {
        userID: this.userID,
        assistantID: this.assistantID,
        authorization: this.accessToken,
      },
    };

    this.webSocket?.send(JSON.stringify(messageObj));

    await this.startInputStream();

    console.log('listening');

    this.updateState(VOICE_STATE.LISTENING);
  }

  end() {
    this.stopInputStream();

    this.audioQueue = Promise.resolve();
    this.webSocket?.close();
    this.webSocket = null;
    this.lastMarkIndex = 0;
    this.lastSentMarkIndex = 0;
    this.inputAudioStream = null;
    this.mediaRecorder = null;
    this.currentAudioElement = {
      outputAudioElement: new Audio(),
      outputSourceBuffer: null,
    };

    if (this.talkingTimeout) {
      clearTimeout(this.talkingTimeout);
      this.talkingTimeout = null;
    }

    this.updateState(VOICE_STATE.ENDED);
  }

  startConversation = () => {
    this.start();
  };

  endConversation = () => {
    this.end();
  };

  updateState = (state: VoiceState) => {
    this.state = state;

    this.listeners.forEach((listener) => listener(state));
  };

  onStateUpdate = (cb: (state: VoiceState) => void) => {
    this.listeners.push(cb);

    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== cb);
    };
  };
}
