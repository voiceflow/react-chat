export class AudioService {
  webSocket: WebSocket | null = null;

  private lastMarkIndex = 0;

  private lastSentMarkIndex = 0;

  private audioQueue = Promise.resolve();

  private talkingTimeout: NodeJS.Timeout | null = null;

  private currentAudioElement: {
    outputAudioElement: HTMLAudioElement;
    outputSourceBuffer: SourceBuffer | null;
  } = {
    outputAudioElement: new Audio(),
    outputSourceBuffer: null,
  };

  private onMark: (markIndex: number) => void;

  private onListening: () => void;

  private onTimeUpdate: () => void;

  constructor(options: { onMark: (markIndex: number) => void; onListening: () => void; onTimeUpdate: () => void }) {
    this.onMark = options.onMark;
    this.onListening = options.onListening;
    this.onTimeUpdate = options.onTimeUpdate;
  }

  sendMark = () => {
    if (this.lastMarkIndex === this.lastSentMarkIndex) return;

    this.lastSentMarkIndex = this.lastMarkIndex;

    this.onMark(this.lastMarkIndex);
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

  async addChunk(base64Chunk: string, markIndex: number) {
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

  cleanup() {
    this.currentAudioElement.outputSourceBuffer?.abort();
    this.currentAudioElement.outputAudioElement.pause();
    this.currentAudioElement.outputAudioElement.currentTime = 0;
    this.currentAudioElement.outputAudioElement.src = '';
  }

  interrupt() {
    this.cleanup();

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
      if (outputAudioElement === this.currentAudioElement.outputAudioElement) {
        this.onTimeUpdate();
      }

      if (this.talkingTimeout) {
        clearTimeout(this.talkingTimeout);
      }

      this.talkingTimeout = setTimeout(() => {
        this.onListening();
        this.talkingTimeout = null;
      }, 500);
    });

    outputAudioElement.play();

    return ref;
  }

  start() {
    this.currentAudioElement = this.createAudioElement();
  }

  stop() {
    this.cleanup();

    this.audioQueue = Promise.resolve();
    this.lastMarkIndex = 0;
    this.lastSentMarkIndex = 0;
    this.currentAudioElement = {
      outputAudioElement: new Audio(),
      outputSourceBuffer: null,
    };

    if (this.talkingTimeout) {
      clearTimeout(this.talkingTimeout);
      this.talkingTimeout = null;
    }
  }
}
