import { useCallback, useState } from 'react';

import { PostMessage } from '@/common';

export const sendMessage = (message: PostMessage.Message) => {
  window.parent.postMessage(JSON.stringify(message), '*');
};

export const useSendMessage = (message: PostMessage.Message) => {
  return useCallback(() => {
    sendMessage(message);
  }, []);
};

export const useForceUpdate = (): [() => void, number] => {
  const [key, forceUpdate] = useState<number>(0);

  return [useCallback(() => forceUpdate((prevKey) => prevKey + 1), []), key];
};
