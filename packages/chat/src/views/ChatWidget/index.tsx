import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { Trace } from '@voiceflow/base-types';
import React, { useContext, useMemo, useState } from 'react';

import { Launcher } from '@/components/Launcher';
import Proactive from '@/components/Proactive';
import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts';
import { useChatAPI } from '@/hooks';
import { usePalette } from '@/hooks/usePalette';
import { PALETTE } from '@/styles/colors.css';
import { useResolveAssistantStyleSheet } from '@/utils/stylesheet';
import { ChatWindow } from '@/views/ChatWindow';

import { chatContainer, launcherContainer, widgetContainer } from './styles.css';

interface ChatWidgetProps extends React.PropsWithChildren {
  shadowRoot?: ShadowRoot;
  chatAPI: VoiceflowChat | undefined;
  ready?: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ shadowRoot, chatAPI, ready }) => {
  const { assistant, open, close, interact } = useContext(RuntimeStateAPIContext);
  const { isOpen } = useContext(RuntimeStateContext);

  /** initialization */
  const [isHidden, setHidden] = useState(false);
  const [proactiveMessages, setProactiveMessages] = useState<Trace.AnyTrace[]>([]);
  const isMobile = useMemo(() => window.matchMedia('(max-width: 768px)').matches, []);

  const palette = usePalette(assistant);

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
  if (!palette) return null;

  return (
    <div
      style={assignInlineVars(PALETTE, { colors: palette })}
      className={widgetContainer({ hidden: isHidden, withChat: isOpen })}
    >
      <div className={launcherContainer} style={position}>
        <Proactive side={side} messages={proactiveMessages} />
        <Launcher onClick={open} isOpen={isOpen} image={assistant.launcher} />
      </div>
      <div className={chatContainer} style={isMobile ? {} : position}>
        <ChatWindow />
      </div>
    </div>
  );
};
