import type { RuntimeAction } from '@voiceflow/sdk-runtime';
import React, { useEffect, useMemo, useState } from 'react';

import { Assistant, ChatPosition, isObject, Listeners, PostMessage, useTheme } from '@/common';
import Launcher from '@/components/Launcher';
import { noop } from '@/utils/functional';
import { useResolveAssistantStyleSheet } from '@/utils/stylesheet';

import { ChatContainer, Container, LauncherContainer } from './styled';
import { ChatAPI } from './types';

interface ChatWidgetProps extends React.PropsWithChildren {
  assistant?: Assistant | undefined;
  widgetURL?: string;
  chatAPI?: ChatAPI | undefined;
  sendMessage: (message: PostMessage.AnyMessage) => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ children, chatAPI, sendMessage, assistant }) => {
  /** initialization */
  const [isOpen, setOpen] = useState(false);
  const [isHidden, setHidden] = useState(false);
  const isMobile = useMemo(() => window.matchMedia('(max-width: 768px)').matches, []);

  const theme = useTheme(assistant);

  /** listeners */
  Listeners.useListenMessage(PostMessage.Type.CLOSE, () => setOpen(false));
  Listeners.useListenMessage(PostMessage.Type.OPEN, () => setOpen(true));

  const open = React.useCallback(() => sendMessage({ type: PostMessage.Type.OPEN }), []);
  const close = React.useCallback(() => sendMessage({ type: PostMessage.Type.CLOSE }), []);

  /** initialize window */
  useEffect(() => {
    if (!isObject(chatAPI)) return undefined;

    Object.assign(chatAPI, {
      open,
      close,
      hide: () => setHidden(true),
      show: () => setHidden(false),
      interact: (action: RuntimeAction) => sendMessage({ type: PostMessage.Type.INTERACT, payload: action }),
    });

    return () => {
      Object.assign(chatAPI, {
        open: noop,
        hide: noop,
        show: noop,
        close: noop,
        interact: noop,
      });
    };
  }, []);

  const side = assistant?.position ?? ChatPosition.RIGHT;
  const position = { bottom: assistant?.spacing.bottom, [side]: assistant?.spacing.side };

  const isStyleSheetResolved = useResolveAssistantStyleSheet(assistant);

  return (
    <Container withChat={isOpen} isHidden={isHidden} className={theme}>
      {!!assistant && isStyleSheetResolved && (
        <LauncherContainer style={position}>
          <Launcher onClick={open} image={assistant.launcher} />
        </LauncherContainer>
      )}
      <ChatContainer style={isMobile ? {} : position}>{children}</ChatContainer>
    </Container>
  );
};

export default Object.assign(ChatWidget, {
  Launcher,
  Container,
  ChatContainer,
  LauncherContainer,
});
