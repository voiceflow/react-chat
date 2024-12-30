import { VOICE_STATE, VoiceState } from '@/constant/voice.constant';

// import { AudioService } from './legacy-audio.service';
import { AudioService } from './audio.service';
import { RecorderService } from './recorder.service';
import { SocketInputMessage, SocketService } from './socket.service';

export interface VoiceServiceOptions {
  url: string;
  userID?: string;
  accessToken: string;
  assistantID: string;
}

export class VoiceService {
  private state: string = VOICE_STATE.IDLE;

  private userID: string;

  private listeners: Array<(state: VoiceState) => void> = [];

  private accessToken: string;

  private assistantID: string;

  private audio: AudioService | null = null;

  private socket: SocketService;

  private recorder: RecorderService;

  constructor({ url, userID, accessToken, assistantID }: VoiceServiceOptions) {
    this.userID = userID ?? 'test';
    this.assistantID = assistantID;
    this.accessToken = accessToken;

    // this.audio = new AudioService({
    //   onMark: this.onAudioMark,
    //   onListening: this.onAudioListening,
    //   onTimeUpdate: this.onAudioTimeUpdate,
    // });
    this.socket = new SocketService({
      url: `${url}/voice/socket`,
      onError: this.onSocketError,
      onMessage: this.onSocketMessage,
    });
    this.recorder = new RecorderService(this.onRecorderDataAvailable);
  }

  private onAudioMark = (markIndex: number) => {
    this.socket?.send({ type: 'mark', payload: { markIndex } });
  };

  private onAudioTalking = () => {
    this.updateState(VOICE_STATE.TALKING);
  };

  private onAudioTimeUpdate = () => {
    this.updateState(VOICE_STATE.TALKING);
  };

  private onAudioListening = () => {
    this.updateState(VOICE_STATE.LISTENING);
  };

  private onRecorderDataAvailable = (data: Blob) => {
    this.socket.send(data);
  };

  private onSocketError = () => {
    // TODO: Handle socket error
  };

  private onSocketMessage = (message: SocketInputMessage) => {
    if (message.type === 'audio') {
      this.audio?.addChunk(message.payload.audio, message.payload.markIndex);
    } else if (message.type === 'end') {
      console.info('Conversation ended by server.', 'system');
      this.recorder.stop();
    } else if (message.type === 'interrupt') {
      this.audio?.interrupt();
    }
  };

  private async start() {
    this.updateState(VOICE_STATE.INITIALIZING);

    this.audio = new AudioService({
      onMark: this.onAudioMark,
      onTalking: this.onAudioTalking,
      onListening: this.onAudioListening,
    });

    await this.socket.start();

    this.socket.send({
      type: 'start',
      payload: {
        userID: this.userID,
        assistantID: this.assistantID,
        authorization: this.accessToken,
      },
    });

    await this.recorder.start();

    this.updateState(VOICE_STATE.LISTENING);

    console.info('listening...');
  }

  private stop() {
    this.recorder.stop();
    this.socket.stop();
    this.audio?.stop();

    this.updateState(VOICE_STATE.ENDED);
  }

  endConversation = () => this.stop();

  startConversation = () => this.start();

  updateState = (state: VoiceState) => {
    if (this.state === state) return;

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
