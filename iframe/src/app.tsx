import './types';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ChatConfig, Listeners, PostMessage, useTheme, RuntimeAction } from '@/common';
import { Bubble } from '@/components';

import { useSendMessage } from './hooks';
import { ButtonContainer, ChatContainer, ChatIframe, Container } from './styled';

interface AppProps extends React.PropsWithChildren, ChatConfig {
  widgetURL?: string;
}

const App: React.FC<AppProps> = ({ children, widgetURL, ...config }) => {
  /** initialization */
  const chatRef = useRef<HTMLIFrameElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [isHidden, setHidden] = useState(false);

  const theme = useTheme(config);
  const sendMessage = useSendMessage(chatRef, widgetURL);
  const onLoad = useCallback(() => sendMessage({ type: PostMessage.Type.LOAD, payload: config }), [config]);

  /** listeners */
  Listeners.useListenMessage(PostMessage.Type.CLOSE, () => setOpen(false));
  Listeners.useListenMessage(PostMessage.Type.OPEN, () => setOpen(true));

  const open = React.useCallback(() => sendMessage({ type: PostMessage.Type.OPEN }), []);
  const close = React.useCallback(() => sendMessage({ type: PostMessage.Type.CLOSE }), []);

  /** initialize window */
  useEffect(() => {
    window.voiceflow ??= {} as any;
    window.voiceflow.chat ??= {} as any;
    Object.assign(window.voiceflow.chat, {
      open,
      close,
      hide: () => setHidden(true),
      show: () => setHidden(false),
      interact: (action: RuntimeAction) => sendMessage({ type: PostMessage.Type.INTERACT, payload: action }),
    });
  }, []);

  return (
    <Container withChat={isOpen} isHidden={isHidden} className={theme}>
      <ButtonContainer>
        <Bubble svg="launch" onClick={open} color="$white" />
      </ButtonContainer>
      <ChatContainer>{widgetURL ? <ChatIframe src={widgetURL} title="voiceflow-chat" ref={chatRef} onLoad={onLoad} /> : children}</ChatContainer>
    </Container>
  );
};

export default Object.assign(App, {
  Container,
  ChatIframe,
  ChatContainer,
  ButtonContainer,
});
