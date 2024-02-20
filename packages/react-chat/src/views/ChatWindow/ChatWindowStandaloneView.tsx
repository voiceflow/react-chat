import { useContext } from 'react';

import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts';
import { useChatAPI, useTheme } from '@/hooks';
import { useResolveAssistantStyleSheet } from '@/utils/stylesheet';

import ChatWindow from '.';

interface ChatWindowStandaloneViewProps extends React.PropsWithChildren {
  chatAPI?: VoiceflowChat | undefined;
  ready?: () => void;
}

const ChatWindowStandaloneView: React.FC<ChatWindowStandaloneViewProps> = ({ chatAPI, ready }) => {
  const { shadowRoot } = useContext(RuntimeStateContext);
  const { assistant, interact } = useContext(RuntimeStateAPIContext);
  const theme = useTheme(assistant);

  const isStyleSheetResolved = useResolveAssistantStyleSheet(assistant, shadowRoot);

  useChatAPI(
    chatAPI,
    () => {
      console.info('Methods open, close, hide, show, proactive.clear, proactive.push have no effect in this mode.');

      return { interact };
    },
    ready
  );

  if (!isStyleSheetResolved) return null;
  return <ChatWindow className={theme} />;
};

export default ChatWindowStandaloneView;
