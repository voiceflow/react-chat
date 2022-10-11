import './types';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ChatConfig, Listeners, PostMessage } from '@/common';
import { Bubble } from '@/components';
import { createCustomTheme } from '@/styles';

import { ButtonContainer, ChatContainer, ChatIframe, Container } from './styled';

const WIDGET_URL = 'http://127.0.0.1:3002';

interface AppProps extends React.PropsWithChildren, ChatConfig {}

const App: React.FC<AppProps> = ({ children, ...config }) => {
  /** initialization */
  const chatRef = useRef<HTMLIFrameElement>(null);
  const [isOpen, setOpen] = useState(false);
  const { color } = config;

  const [theme, setTheme] = useState<string>('');
  useEffect(() => {
    setTheme(createCustomTheme({ color }));
  }, [color]);

  /** actions */
  const sendMessage = useCallback((message: PostMessage.AnyMessage) => {
    const encodedMessage = JSON.stringify(message);
    window.postMessage(encodedMessage);
    chatRef.current?.contentWindow?.postMessage(encodedMessage, WIDGET_URL);
  }, []);

  const onLoad = useCallback(() => {
    sendMessage({ type: PostMessage.Type.LOAD, payload: config });
  }, [config]);

  Listeners.useListenMessage(PostMessage.Type.CLOSE, () => setOpen(false));

  Listeners.useListenMessage(PostMessage.Type.OPEN, () => setOpen(true));

  /** initialize window */
  useEffect(() => {
    window.voiceflow.open = () => sendMessage({ type: PostMessage.Type.OPEN });
    window.voiceflow.close = () => sendMessage({ type: PostMessage.Type.CLOSE });
  }, []);

  return (
    <Container withChat={isOpen} className={theme}>
      <ButtonContainer>
        <Bubble svg="launch" onClick={window.voiceflow.open} color="$white" />
      </ButtonContainer>
      <ChatContainer>{children || <ChatIframe src={WIDGET_URL} title="voiceflow-chat" ref={chatRef} onLoad={onLoad} />}</ChatContainer>
    </Container>
  );
};

export default Object.assign(App, {});
