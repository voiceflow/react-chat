import { useContext, useEffect } from 'react';

import { isObject } from '@/common/utils';
import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts';
import { useTheme } from '@/hooks';
import { noop } from '@/utils/functional';
import { useResolveAssistantStyleSheet } from '@/utils/stylesheet';

import { ChatAPI } from '../ChatWidget/types';
import ChatWindow from '.';

interface ChatWindowStandaloneViewProps extends React.PropsWithChildren {
  chatAPI?: ChatAPI | undefined;
  ready?: () => void;
}

const ChatWindowStandaloneView: React.FC<ChatWindowStandaloneViewProps> = ({ chatAPI, ready }) => {
  const { shadowRoot } = useContext(RuntimeStateContext);
  const { assistant, interact } = useContext(RuntimeStateAPIContext);
  const theme = useTheme(assistant);

  const isStyleSheetResolved = useResolveAssistantStyleSheet(assistant, shadowRoot);

  useEffect(() => {
    if (!isObject(chatAPI)) return undefined;
    console.info('Methods open, close, hide, show, proactive.clear, proactive.push have no effect in this mode.');

    const noopWarn = (method: string) => () => console.warn(`Method '${method}' has no effect in this mode.`);

    Object.assign(chatAPI, {
      open: noopWarn('open'),
      close: noopWarn('close'),
      hide: noopWarn('hide'),
      show: noopWarn('show'),
      interact,
      proactive: {
        clear: noopWarn('proactive.clear'),
        push: noopWarn('proactive.push'),
      },
    });

    ready?.();

    return () => {
      Object.assign(chatAPI, {
        open: noop,
        hide: noop,
        show: noop,
        close: noop,
        interact: noop,
        proactive: {
          clear: noop,
          push: noop,
        },
      });
    };
  }, []);

  if (!isStyleSheetResolved) return null;
  return <ChatWindow className={theme} />;
};

export default ChatWindowStandaloneView;
