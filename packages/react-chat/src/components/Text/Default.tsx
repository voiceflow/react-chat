import { serializeToMarkdown } from '@voiceflow/slate-serializer/markdown';
import React from 'react';
import rehypeRaw from 'rehype-raw';

import Message from '@/components/Message';
import type { TextMessageProps } from '@/components/SystemResponse/types';
import { RuntimeStateAPIContext } from '@/contexts';

import Markdown from './Markdown';

export interface DefaultTextProps {
  /**
   * text whether in string or slate format
   */
  text: TextMessageProps['text'];
}

// this is just eslint being dumb because "allowDangerousHTML" contains "HTML"
const DefaultText: React.FC<DefaultTextProps> = ({ text }) => {
  const api = React.useContext(RuntimeStateAPIContext);

  const content = typeof text === 'string' ? text : serializeToMarkdown(text);

  if (api?.config?.allowDangerousHTML) {
    return (
      <Message from="system">
        <Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
      </Message>
    );
  }

  return (
    <Message from="system">
      <Markdown>{content}</Markdown>
    </Message>
  );
};

// memoize to prevent re-rendering
export default React.memo(DefaultText);
