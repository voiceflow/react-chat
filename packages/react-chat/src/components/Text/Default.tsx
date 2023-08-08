import { serializeToMarkdown } from '@voiceflow/slate-serializer/markdown';
import React from 'react';

import Message from '@/components/Message';
import type { TextMessageProps } from '@/components/SystemResponse/types';

import Markdown from './Markdown';

export interface DefaultTextProps {
  /**
   * text whether in string or slate format
   */
  text: TextMessageProps['text'];
}

const DefaultText: React.FC<DefaultTextProps> = ({ text }) => {
  return (
    <Message from="system">
      <Markdown>{typeof text === 'string' ? text : serializeToMarkdown(text)}</Markdown>
    </Message>
  );
};

export default DefaultText;
