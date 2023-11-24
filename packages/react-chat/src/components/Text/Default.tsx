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

const DefaultText: React.FC<DefaultTextProps> = ({ text }) => {
  const api = React.useContext(RuntimeStateAPIContext);

  return (
    <Message from="system">
      <Markdown rehypePlugins={api?.config?.allowDangerousHTML ? [rehypeRaw] : []}>
        {typeof text === 'string' ? text : serializeToMarkdown(text)}
      </Markdown>
    </Message>
  );
};

// memoize to prevent re-rendering
export default React.memo(DefaultText);
