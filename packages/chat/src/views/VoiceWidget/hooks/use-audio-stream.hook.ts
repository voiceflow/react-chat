import { useCallback, useState } from 'react';

export const STREAM_STATE = {
  IDLE: 'IDLE',
  INITIALIZING: 'INITIALIZING',
  ACTIVE: 'ACTIVE',
  STOPPED: 'STOPPED',
};

type STREAM_STATE = (typeof STREAM_STATE)[keyof typeof STREAM_STATE];

export interface IUseAudioStream {
  onReady?: (stream: MediaStream) => void;
}

export const useAudioStream = (options?: IUseAudioStream) => {
  const { onReady } = options ?? {};

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<{ code: number; message: string; error: any } | null>(null);
  const [state, setState] = useState<STREAM_STATE>(STREAM_STATE.IDLE);

  const initStream = useCallback(async () => {
    try {
      setError(null);
      setState(STREAM_STATE.INITIALIZING);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      setState(STREAM_STATE.ACTIVE);
      setStream(stream);

      onReady?.(stream);
    } catch (error) {
      setState(STREAM_STATE.STOPPED);
      setError({
        code: 0,
        error,
        message: 'Error initializing audio stream',
      });
    }
  }, [setError, setState, setStream]);

  const closeStream = useCallback(() => {
    stream?.getTracks().forEach((track) => track.stop());

    setStream(null);
    setState(STREAM_STATE.STOPPED);
  }, [stream]);

  return {
    error,
    state,
    stream,

    initStream,
    closeStream,
  };
};
