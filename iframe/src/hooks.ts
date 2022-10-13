import { MutableRefObject, useCallback } from 'react';

import { PostMessage } from '@/common';

export const useSendMessage = (chatRef: MutableRefObject<HTMLIFrameElement | null>, target = '*') =>
  useCallback((message: PostMessage.AnyMessage) => {
    const encodedMessage = JSON.stringify(message);
    window.postMessage(encodedMessage);
    chatRef.current?.contentWindow?.postMessage(encodedMessage, target);
  }, []);
