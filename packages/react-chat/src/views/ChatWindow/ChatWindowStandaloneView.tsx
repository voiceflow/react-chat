import { useContext } from 'react';

import { RuntimeStateAPIContext } from '@/contexts';
import { useChatAPI, useTheme } from '@/hooks';
import { useResolveAssistantStyleSheet } from '@/utils/stylesheet';

import ChatWindow from '.';

interface ChatWindowStandaloneViewProps extends React.PropsWithChildren {
  shadowRoot: ShadowRoot;
  chatAPI: VoiceflowChat | undefined;
  ready?: () => void;
}

const ChatWindowStandaloneView: React.FC<ChatWindowStandaloneViewProps> = ({ shadowRoot, chatAPI, ready }) => {
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
