import { useContext, useEffect } from 'react';

import { RuntimeStateAPIContext } from '@/contexts';
import { useChatAPI, useTheme } from '@/hooks';
import { useResolveAssistantStyleSheet } from '@/utils/stylesheet';

import ChatWindow from '../ChatWindow';

interface ChatEmbedProps extends React.PropsWithChildren {
  shadowRoot: ShadowRoot;
  chatAPI: VoiceflowChat | undefined;
  ready?: () => void;
}

const ChatEmbed: React.FC<ChatEmbedProps> = ({ shadowRoot, chatAPI, ready }) => {
  const { assistant, interact, open } = useContext(RuntimeStateAPIContext);
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

  useEffect(() => {
    // "open" the embedded chat window to trigger launch
    open();
  }, []);

  if (!isStyleSheetResolved) return null;
  return <ChatWindow className={theme} />;
};

export default ChatEmbed;
