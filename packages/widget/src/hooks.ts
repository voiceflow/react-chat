import { PostMessage } from '@voiceflow/react-chat';
import { MutableRefObject, useCallback } from 'react';

export const useSendMessage = (chatRef: MutableRefObject<HTMLIFrameElement | null>, target = '*') =>
  useCallback((message: PostMessage.AnyMessage) => {
    const encodedMessage = JSON.stringify(message);
    window.postMessage(encodedMessage);
    chatRef.current?.contentWindow?.postMessage(encodedMessage, target);
  }, []);
