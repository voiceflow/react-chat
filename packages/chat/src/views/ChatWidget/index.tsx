import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { Trace } from '@voiceflow/base-types';
import clsx from 'clsx';
import { useContext, useMemo, useState } from 'react';

import { Launcher } from '@/components/Launcher';
import { LAUNCHER_SIZE, LAUNCHER_WIDTH_LABEL_SIZE } from '@/components/Launcher/styles.css';
import { Proactive } from '@/components/Proactive';
import { ClassName } from '@/constants';
import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts';
import { RenderMode } from '@/dtos/RenderOptions.dto';
import { useChatAPI } from '@/hooks/useChatAPI';
import { usePalette } from '@/hooks/usePalette';
import { PALETTE } from '@/styles/colors.css';
import { BREAKPOINTS } from '@/styles/sizes';
import { useResolveAssistantStyleSheet } from '@/utils/stylesheet';
import { ChatWindow } from '@/views/ChatWindow';

import {
  chatContainer,
  LAUNCHER_MARGIN,
  launcherContainer,
  POPOVER_SPACING,
  popoverBackdrop,
  widgetContainer,
} from './styles.css';
import { WidgetSettingsChatRenderMode } from '@voiceflow/dtos-interact';

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
  const isMobile = useMemo(() => window.matchMedia(`(max-width: ${BREAKPOINTS.mobile})`).matches, []);

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
  const launcherButtonSize = assistant.common.launcher.text ? LAUNCHER_WIDTH_LABEL_SIZE : LAUNCHER_SIZE;
  const chatHeight = `calc(100% - ${launcherButtonSize + LAUNCHER_MARGIN + parseInt(assistant.common.bottomSpacing, 10) + 20}px)`;

  const isStyleSheetResolved = useResolveAssistantStyleSheet(assistant, shadowRoot);

  if (!isStyleSheetResolved) return null;
  if (!palette) return null;

  const isPopover = assistant.chat.renderMode === WidgetSettingsChatRenderMode.POPOVER;

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
          type={assistant.common.launcher.type}
          image={assistant.common.launcher.imageURL}
          label={assistant.common.launcher.text}
        />
      </div>
      <div className={popoverBackdrop({ visible: isPopover && isOpen })} onClick={() => close()} />
      <div
        className={chatContainer({ popover: isPopover && !isMobile })}
        style={
          isMobile || isPopover
            ? {
                top: isPopover ? POPOVER_SPACING : 0,
                bottom: 0,
              }
            : {
                [side]: position[side],
                bottom: `${parseInt(position.bottom, 10) + launcherButtonSize + LAUNCHER_MARGIN}px`,
                height: chatHeight,
              }
        }
      >
        <ChatWindow isMobile={isMobile} />
      </div>
    </div>
  );
};
