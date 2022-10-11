import './types';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Listeners, PostMessage } from '@/common';
import { Bubble } from '@/components';
import { createCustomTheme } from '@/styles';

import { useConfig } from './hooks';
import { ButtonContainer, ChatContainer, ChatIframe, Container } from './styled';

const WIDGET_URL = 'http://127.0.0.1:3002';

const App: React.FC = () => {
  /** initialization */
  const chatRef = useRef<HTMLIFrameElement>(null);
  const [isOpen, setOpen] = useState(false);
  const config = useConfig();
  const { color } = config;

  const [theme, setTheme] = useState<string>('');
  useEffect(() => {
    setTheme(createCustomTheme({ color }));
  }, [color]);

  /** actions */
  const sendMessage = useCallback((message: PostMessage.Message) => {
    chatRef.current?.contentWindow?.postMessage(JSON.stringify(message), WIDGET_URL);
  }, []);

  const onLoad = useCallback(() => {
    sendMessage({ type: PostMessage.Type.LOAD, payload: config });
  }, [config]);

  const handleOpen = async (): Promise<void> => {
    setOpen(true);
    sendMessage({ type: PostMessage.Type.OPEN });
  };

  Listeners.useListenMessage(PostMessage.Type.CLOSE, () => {
    setOpen(false);
  });

  return (
    <Container withChat={isOpen} className={theme}>
      <ButtonContainer>
        <Bubble svg="launch" onClick={handleOpen} color="$white" />
      </ButtonContainer>
      <ChatContainer>
        <ChatIframe src={WIDGET_URL} title="voiceflow-chat" ref={chatRef} onLoad={onLoad} />
      </ChatContainer>
    </Container>
  );
};

export default Object.assign(App, {});
