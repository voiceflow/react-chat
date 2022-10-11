import { useCallback, useEffect, useState } from 'react';

import ChatWidget from './Chat';
import { useListenMessage, useSendMessage } from './hooks';
import * as PostMessage from './PostMessage';
import { ChatConfig } from './types';

export const MessageController: React.FC = () => {
  const [config, setConfig] = useState<ChatConfig | null>(null);

  const listen = useListenMessage();
  const sendMessage = useSendMessage();

  useEffect(() => {
    listen(PostMessage.Type.LOAD, ({ payload }) => {
      setConfig(payload);
    });
  }, []);

  const close = useCallback(() => {
    sendMessage({ type: PostMessage.Type.CLOSE });
  }, []);

  if (!config) {
    return null;
  }

  return <ChatWidget {...config} close={close} />;
};

export default MessageController;
