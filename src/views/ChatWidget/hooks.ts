import { useCallback, useState } from 'react';

import { PostMessage } from '@/common';

export const sendMessage = (message: PostMessage.AnyMessage) => {
  const encodedMessage = JSON.stringify(message);
  window.postMessage(encodedMessage);
  window.parent.postMessage(encodedMessage, '*');
};

export const useSendMessage = (message: PostMessage.AnyMessage) => {
  return useCallback(() => {
    sendMessage(message);
  }, []);
};

export const useForceUpdate = (): [() => void, number] => {
  const [key, forceUpdate] = useState<number>(0);

  return [useCallback(() => forceUpdate((prevKey) => prevKey + 1), []), key];
};
