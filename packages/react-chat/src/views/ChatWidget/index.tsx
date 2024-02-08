// import { Trace } from '@voiceflow/base-types';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import { styled } from '@/styles/theme';

// import { ChatPosition, isObject } from '@/common';
// import Launcher from '@/components/Launcher';
// import Proactive from '@/components/Proactive';
// import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts';
// import { useTheme } from '@/hooks';
// import { noop } from '@/utils/functional';
// import { useResolveAssistantStyleSheet } from '@/utils/stylesheet';
// import ChatWindow from '@/views/ChatWindow';
// import { ChatContainer, Container, LauncherContainer } from './styled';
import { ChatAPI } from './types';

interface ChatWidgetProps extends React.PropsWithChildren {
  chatAPI?: ChatAPI | undefined;
  ready?: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({}) => {
  const ComponentStyled = styled('div', { backgroundColor: 'red', width: 20, height: 20 });
  console.log('ChatWidget inside', ComponentStyled, '<< component styled in side of it', styled);

  return <ComponentStyled />;
  // const { assistant, open, close, interact } = useContext(RuntimeStateAPIContext);
  // const { isOpen, shadowRoot } = useContext(RuntimeStateContext);

  // /** initialization */
  // const [isHidden, setHidden] = useState(false);
  // const [proactiveMessages, setProactiveMessages] = useState<Trace.AnyTrace[]>([]);
  // const isMobile = useMemo(() => window.matchMedia('(max-width: 768px)').matches, []);

  // const theme = useTheme(assistant);

  // /** initialize window */
  // useEffect(() => {
  //   if (!isObject(chatAPI)) return undefined;

  //   Object.assign(chatAPI, {
  //     open,
  //     close,
  //     hide: () => setHidden(true),
  //     show: () => setHidden(false),
  //     interact,
  //     proactive: {
  //       clear: () => setProactiveMessages([]),
  //       push: (...messages: Trace.AnyTrace[]) => setProactiveMessages((prev) => [...prev, ...messages]),
  //     },
  //   });

  //   ready?.();

  //   return () => {
  //     Object.assign(chatAPI, {
  //       open: noop,
  //       hide: noop,
  //       show: noop,
  //       close: noop,
  //       interact: noop,
  //       proactive: {
  //         clear: noop,
  //         push: noop,
  //       },
  //     });
  //   };
  // }, []);

  // const side = assistant?.position ?? ChatPosition.RIGHT;
  // const position = { bottom: assistant?.spacing.bottom, [side]: assistant?.spacing.side };

  // const isStyleSheetResolved = useResolveAssistantStyleSheet(assistant, shadowRoot);

  // if (!isStyleSheetResolved) return null;

  // return (
  //   <Container withChat={isOpen} isHidden={isHidden} className={theme}>
  //     {!!assistant && (
  //       <LauncherContainer style={position}>
  //         <Proactive side={side} messages={proactiveMessages} />
  //         <Launcher onClick={open} image={assistant.launcher} />
  //       </LauncherContainer>
  //     )}
  //     <ChatContainer style={isMobile ? {} : position}>
  //       <ChatWindow />
  //     </ChatContainer>
  //   </Container>
  // );
};

export default Object.assign(ChatWidget, {
  //Launcher,
  // Container,
  // ChatContainer,
  //  LauncherContainer,
});
