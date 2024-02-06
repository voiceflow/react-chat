import { useContext } from 'react';

import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts';
import { useTheme } from '@/hooks';
import { useResolveAssistantStyleSheet } from '@/utils/stylesheet';

import ChatWindow from '.';

const ChatWindowStandaloneView: React.FC = () => {
  const { shadowRoot } = useContext(RuntimeStateContext);
  const { assistant } = useContext(RuntimeStateAPIContext);
  const theme = useTheme(assistant);

  const isStyleSheetResolved = useResolveAssistantStyleSheet(assistant, shadowRoot);

  if (!isStyleSheetResolved) return null;
  return <ChatWindow className={theme} withHeader={false} />;
};

export default ChatWindowStandaloneView;
