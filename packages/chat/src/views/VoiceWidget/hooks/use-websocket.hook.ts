import { useCallback, useState } from 'react';

export const WEBSOCKET_STATE = {
  IDLE: 'IDLE',
  CONNECTING: 'CONNECTING',
  OPEN: 'OPEN',
  CLOSING: 'CLOSING',
  CLOSED: 'CLOSED',
};

type WEBSOCKET_STATE = (typeof WEBSOCKET_STATE)[keyof typeof WEBSOCKET_STATE];

export interface IUseAudioStream {
  url: string;
  onOpened?: (ws: WebSocket) => void;
}

export const useWebsocket = ({ url, onOpened }: IUseAudioStream) => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [error, setError] = useState<{ code: number; message: string; error: any } | null>(null);
  const [state, setState] = useState<WEBSOCKET_STATE>(WEBSOCKET_STATE.IDLE);

  const onClose = useCallback(() => {
    webSocket?.removeEventListener('close', onClose);

    setState(WEBSOCKET_STATE.CLOSED);
    setWebSocket(null);
  }, [setState]);

  const initializeWebSocket = useCallback(async () => {
    try {
      setError(null);
      setState(WEBSOCKET_STATE.CONNECTING);

      const webSocket = await new Promise<WebSocket>((resolve, reject) => {
        const ws = new WebSocket(url);

        const onOpen = () => {
          removeListeners();
          resolve(ws);
        };

        const onClose = () => {
          removeListeners();
          reject(new Error('WebSocket closed'));
        };

        const onError = (error: any) => {
          removeListeners();
          reject(error);
        };

        ws.addEventListener('open', onOpen);
        ws.addEventListener('close', onClose);
        ws.addEventListener('error', onError);

        const removeListeners = () => {
          ws.removeEventListener('open', onOpen);
          ws.removeEventListener('close', onClose);
          ws.removeEventListener('error', onError);
        };
      });

      webSocket.addEventListener('close', onClose);

      setState(WEBSOCKET_STATE.OPEN);
      setWebSocket(webSocket);

      onOpened?.(webSocket);
    } catch (error) {
      setState(WEBSOCKET_STATE.CLOSED);
      setError({
        code: 0,
        error,
        message: 'Error initializing websocket',
      });
    }
  }, [setError, setState, onClose, setWebSocket]);

  const closeWebSocket = useCallback(() => {
    setState(WEBSOCKET_STATE.CLOSING);

    const closeWebSocket = () => {
      webSocket?.removeEventListener('close', closeWebSocket);
      setWebSocket(null);
      setState(WEBSOCKET_STATE.CLOSED);
    };

    webSocket?.addEventListener('close', closeWebSocket);
    webSocket?.close();
  }, [webSocket]);

  return {
    error,
    state,
    webSocket,

    initializeWebSocket,
    closeWebSocket,
  };
};
