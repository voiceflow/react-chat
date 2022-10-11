import { useCallback, useEffect, useRef } from 'react';

import * as PostMessage from './PostMessage';

interface MessageListener<T extends PostMessage.Type> {
  type: T;
  action: (listener: PostMessage.MessageTypeMap[T]) => void;
}

export const useListenMessage = () => {
  const listeners = useRef<MessageListener<any>[]>([]);

  const handleMessage = useCallback((event: MessageEvent) => {
    const data = JSON.parse(event.data);
    if (!PostMessage.isPostMessage(data)) {
      return;
    }

    listeners.current.forEach((listener) => {
      if (listener.type === data.type) {
        listener.action(data);
      }
    });
  }, []);

  useEffect(() => {
    // For standards-compliant web browsers
    if (window.addEventListener) {
      window.addEventListener('message', handleMessage, false);
      return () => window.removeEventListener('message', handleMessage, false);
    }

    // IE 9 and below
    (window as any).attachEvent('onmessage', handleMessage);
    return () => (window as any).removeEvent('onmessage', handleMessage);
  }, []);

  return <T extends PostMessage.Type>(type: T, action: (listener: PostMessage.MessageTypeMap[T]) => void) => {
    listeners.current.push({ type, action });
  };
};

export const useSendMessage = () => {
  return useCallback((message: PostMessage.Message) => {
    window.parent.postMessage(message);
  }, []);
};
