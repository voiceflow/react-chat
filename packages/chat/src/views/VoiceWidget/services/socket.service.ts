interface SocketAudioInputMessage {
  type: 'audio';
  payload: { audio: string; markIndex: number };
}

interface SocketEndInputMessage {
  type: 'end';
}

interface SocketInterruptInputMessage {
  type: 'interrupt';
}

export type SocketInputMessage = SocketAudioInputMessage | SocketEndInputMessage | SocketInterruptInputMessage;

interface SocketMarkOutputMessage {
  type: 'mark';
  payload: { markIndex: number };
}

interface SocketStartOutputMessage {
  type: 'start';
  payload: { userID: string; assistantID: string; authorization: string };
}

export type SocketOutputMessage = Blob | SocketMarkOutputMessage | SocketStartOutputMessage;

export class SocketService {
  private url: string;

  private socket: WebSocket | null = null;

  private onError: (error: unknown) => void;

  private onMessage: (message: SocketInputMessage) => void;

  private connectionPromise: Promise<WebSocket> | null = null;

  constructor(options: {
    url: string;
    onError: (error: unknown) => void;
    onMessage: (message: SocketInputMessage) => void;
  }) {
    this.url = options.url;
    this.onError = options.onError;
    this.onMessage = options.onMessage;
  }

  private createSocket() {
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    if (this.socket) {
      return Promise.resolve(this.socket);
    }

    this.connectionPromise = new Promise<WebSocket>((resolve, reject) => {
      const socket = new WebSocket(this.url);

      const onOpen = () => {
        console.info('Socket connection established.');

        removeListeners();
        resolve(socket);
      };

      const onError = (error: unknown) => {
        console.error('Socket connection error.', error);

        removeListeners();
        reject(error);
      };

      socket.addEventListener('open', onOpen);
      socket.addEventListener('error', onError);

      const removeListeners = () => {
        socket?.removeEventListener('open', onOpen);
        socket?.removeEventListener('error', onError);
      };
    }).finally(() => {
      this.connectionPromise = null;
    });

    return this.connectionPromise;
  }

  private onSocketError = (event: Event) => {
    console.error('socket error:', event);

    this.onError(event);
    this.stop();
  };

  private onSocketMessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data);

    console.info('socket message:', message);

    this.onMessage(message);
  };

  async start() {
    if (this.socket) {
      console.info('Socket already exists, reusing.');

      return;
    }

    this.socket = await this.createSocket();

    this.socket.addEventListener('error', this.onSocketError);
    this.socket.addEventListener('message', this.onSocketMessage);
  }

  stop() {
    if (this.socket?.readyState !== WebSocket.CLOSED && this.socket?.readyState !== WebSocket.CLOSING) {
      this.socket?.close();
    }

    this.socket?.removeEventListener('error', this.onSocketError);
    this.socket?.removeEventListener('message', this.onSocketMessage);

    this.socket = null;
  }

  send(message: SocketOutputMessage) {
    if (!this.socket) {
      console.warn('Socket is not open, cannot send message.');

      return;
    }

    if (this.socket.readyState !== WebSocket.OPEN) {
      console.warn('Socket is not open, cannot send message.');

      return;
    }

    this.socket.send(message instanceof Blob ? message : JSON.stringify(message));
  }
}
