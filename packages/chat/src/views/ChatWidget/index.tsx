import type { Trace } from '@voiceflow/base-types';
import React, { useContext, useMemo, useState } from 'react';

import Launcher from '@/components/Launcher';
import Proactive from '@/components/Proactive';
import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts';
import { useChatAPI, useTheme } from '@/hooks';
import { useResolveAssistantStyleSheet } from '@/utils/stylesheet';
import ChatWindow from '@/views/ChatWindow';

import { ChatContainer, Container, LauncherContainer } from './styled';

interface ChatWidgetProps extends React.PropsWithChildren {
  shadowRoot?: ShadowRoot;
  chatAPI: VoiceflowChat | undefined;
  ready?: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ shadowRoot, chatAPI, ready }) => {
  const { assistant, open, close, interact } = useContext(RuntimeStateAPIContext);
  const { isOpen } = useContext(RuntimeStateContext);

  /** initialization */
  const [isHidden, setHidden] = useState(false);
  const [proactiveMessages, setProactiveMessages] = useState<Trace.AnyTrace[]>([]);
  const isMobile = useMemo(() => window.matchMedia('(max-width: 768px)').matches, []);

  const theme = useTheme(assistant);

  useChatAPI(
    chatAPI,
    () => ({
      open,
      close,
      hide: () => setHidden(true),
      show: () => setHidden(false),
      interact,
      proactive: {
        clear: () => setProactiveMessages([]),
        push: (...messages: Trace.AnyTrace[]) => setProactiveMessages((prev) => [...prev, ...messages]),
      },
    }),
    ready
  );

  const side = assistant.position;
  const position = { bottom: assistant.spacing.bottom, [side]: assistant.spacing.side };

  const isStyleSheetResolved = useResolveAssistantStyleSheet(assistant, shadowRoot);

  if (!isStyleSheetResolved) return null;

  return (
    <Container withChat={isOpen} isHidden={isHidden} className={theme}>
      <LauncherContainer style={position}>
        <Proactive side={side} messages={proactiveMessages} />
        <Launcher onClick={open} image={assistant.launcher} />
      </LauncherContainer>
      <ChatContainer style={isMobile ? {} : position}>
        <ChatWindow />
      </ChatContainer>
    </Container>
  );
};

export default Object.assign(ChatWidget, {
  Launcher,
  Container,
  ChatContainer,
  LauncherContainer,
});
