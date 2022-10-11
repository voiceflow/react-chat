import './types';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Bubble } from '@/components';
import { createCustomTheme } from '@/styles';

import * as PostMessage from '../src/views/ChatWidget/PostMessage';
import { useConfig } from './hooks';
import { ButtonContainer, ChatContainer, ChatIframe, Container } from './styled';

const WIDGET_URL = 'http://127.0.0.1:5173';

const App: React.FC = () => {
  const chatRef = useRef<HTMLIFrameElement>(null);
  const [isOpen, setOpen] = useState(false);

  const sendMessage = useCallback((message: PostMessage.Message) => {
    chatRef.current?.contentWindow?.postMessage(message);
  }, []);

  const config = useConfig();
  const { color } = config;

  const [theme, setTheme] = useState<string>('');
  useEffect(() => {
    setTheme(createCustomTheme({ color }));
  }, [color]);

  useEffect(() => {
    sendMessage({ type: PostMessage.Type.LOAD, payload: config });
  }, []);

  const handleOpen = async (): Promise<void> => {
    setOpen(true);
    sendMessage({ type: PostMessage.Type.OPEN });
  };

  return (
    <Container withChat={isOpen} className={theme}>
      <ButtonContainer>
        <Bubble svg="launch" onClick={handleOpen} color="$white" />
      </ButtonContainer>
      <ChatContainer>
        <ChatIframe src={WIDGET_URL} title="voiceflow-chat" ref={chatRef} />
      </ChatContainer>
    </Container>
  );
};

export default Object.assign(App, {});
