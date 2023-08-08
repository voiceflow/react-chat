import { serializeToMarkdown } from '@voiceflow/slate-serializer/markdown';
import Markdown from 'markdown-to-jsx';

import Message from '@/components/Message';
import type { TextMessageProps } from '@/components/SystemResponse/types';
import { styled } from '@/styles';

export const MarkdownText = styled(Markdown, {
  p: {
    marginBottom: 0,
  },
});

export interface DefaultTextProps {
  /**
   * text whether in string or slate format
   */
  text: TextMessageProps['text'];
}

const DefaultText: React.FC<DefaultTextProps> = ({ text }) => {
  return (
    <Message from="system">
      <MarkdownText>{typeof text === 'string' ? text : serializeToMarkdown(text)}</MarkdownText>
    </Message>
  );
};

export default DefaultText;
