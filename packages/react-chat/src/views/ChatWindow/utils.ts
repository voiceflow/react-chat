import { PostMessage } from '@/common';

export const sendMessage = (message: PostMessage.AnyMessage) => {
  const encodedMessage = JSON.stringify(message);
  window.postMessage(encodedMessage);
  window.parent.postMessage(encodedMessage, '*');
};
