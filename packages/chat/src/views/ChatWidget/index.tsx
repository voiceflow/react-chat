import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { Trace } from '@voiceflow/base-types';
import clsx from 'clsx';
import { useContext, useMemo, useState } from 'react';

import { Launcher } from '@/components/Launcher';
import { LAUNCHER_SIZE } from '@/components/Launcher/styles.css';
import { Proactive } from '@/components/Proactive';
import { ClassName } from '@/constants';
import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts';
import { useChatAPI } from '@/hooks/useChatAPI';
import { usePalette } from '@/hooks/usePalette';
import { PALETTE } from '@/styles/colors.css';
import { useResolveAssistantStyleSheet } from '@/utils/stylesheet';
import { ChatWindow } from '@/views/ChatWindow';

import { chatContainer, LAUNCHER_MARGIN, launcherContainer, widgetContainer } from './styles.css';

interface ChatWidgetProps extends React.PropsWithChildren {
  shadowRoot?: ShadowRoot;
  chatAPI: VoiceflowChat | undefined;
  ready?: () => void;
  chatWindow?: React.ReactNode;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ shadowRoot, chatAPI, ready }) => {
  const { assistant, open, close, interact } = useContext(RuntimeStateAPIContext);
  const { isOpen } = useContext(RuntimeStateContext);

  /** initialization  */
  const [isHidden, setHidden] = useState(false);
  const [proactiveMessages, setProactiveMessages] = useState<Trace.AnyTrace[]>([]);
  const isMobile = useMemo(() => window.matchMedia('(max-width: 768px)').matches, []);

  const palette = usePalette(assistant);

  const toggleChat = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

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

  const side = assistant.common.position;
  const position = { bottom: `${assistant.common.bottomSpacing}px`, [side]: `${assistant.common.sideSpacing}px` };
  const chatHeight = `calc(100% - ${LAUNCHER_SIZE + LAUNCHER_MARGIN + parseInt(assistant.common.bottomSpacing, 10) + 20}px)`;

  const isStyleSheetResolved = useResolveAssistantStyleSheet(assistant, shadowRoot);

  if (!isStyleSheetResolved) return null;
  if (!palette) return null;

  return (
    <div
      style={assignInlineVars(PALETTE, { colors: palette })}
      className={clsx(ClassName.WIDGET, widgetContainer({ hidden: isHidden, withChat: isOpen }))}
    >
      <div className={launcherContainer} style={position}>
        <Proactive side={side} messages={proactiveMessages} />
        <Launcher
          onClick={toggleChat}
          isOpen={isOpen}
          image={assistant.common.launcher.imageURL}
          label={assistant.common.launcher.text}
        />
      </div>
      <div
        className={chatContainer}
        style={
          isMobile
            ? {}
            : {
                [side]: position[side],
                bottom: `${parseInt(position.bottom, 10) + LAUNCHER_SIZE + LAUNCHER_MARGIN}px`,
                height: chatHeight,
              }
        }
      >
        <ChatWindow isMobile={isMobile} />
      </div>
    </div>
  );
};
