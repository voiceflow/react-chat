// TODO: move this entire module into `browser/` if possible?
import { useEffect, useRef } from 'react';

import * as PostMessage from './postMessage';

export interface MessageListener<T extends PostMessage.Type> {
  type: T;
  action: (listener: PostMessage.MessageTypeMap[T]) => void;
}

interface Context {
  listeners: MessageListener<any>[];
}

export const context: Context = {
  listeners: [],
};

const silentParse = (message: string) => {
  try {
    return JSON.parse(message);
  } catch {
    return null;
  }
};

const handleMessage = (event: MessageEvent) => {
  const data = silentParse(event.data);

  if (!PostMessage.isPostMessage(data)) return;

  context.listeners.forEach((listener) => {
    if (listener.type === data.type) {
      listener.action(data);
    }
  });
};

// TODO: avoid this being in the module scope
if (window.addEventListener) {
  // For standards-compliant web browsers
  window.addEventListener('message', handleMessage, false);
} else {
  // IE 9 and below
  (window as any).attachEvent('onmessage', handleMessage);
}

export const useListenMessage = <T extends PostMessage.Type>(type: T, action: (listener: PostMessage.MessageTypeMap[T]) => void) => {
  const actionRef = useRef(action);

  actionRef.current = action;

  useEffect(() => {
    const listener = { type, action: (listener: PostMessage.MessageTypeMap[T]) => actionRef.current(listener) };
    context.listeners.push(listener);

    return () => {
      context.listeners = context.listeners.filter((l) => l !== listener);
    };
  }, []);
};
