import { MutableRefObject, useCallback } from 'react';

import { PostMessage } from '@/common';

import { WIDGET_URL } from './config';

export const useSendMessage = (chatRef: MutableRefObject<HTMLIFrameElement | null>) =>
  useCallback((message: PostMessage.AnyMessage) => {
    const encodedMessage = JSON.stringify(message);
    window.postMessage(encodedMessage);
    chatRef.current?.contentWindow?.postMessage(encodedMessage, WIDGET_URL);
  }, []);
