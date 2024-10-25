import '../../styles.css';

import type { Text } from '@voiceflow/base-types';
import { serializeToMarkdown } from '@voiceflow/slate-serializer/markdown';
import clsx from 'clsx';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';

import { Icon } from '../Icon';
import {
  aiIconModifier,
  codeBlockContainer,
  contentStyle,
  copyButton,
  embeddedContent,
  generatedChin,
  messageContainer,
} from './AgentMessage.css';
import codeTheme from './code-theme';
import { CopyButton } from './CopyButton';

interface IAgentMessage {
  text: string | Text.SlateTextValue;
  children?: React.ReactNode;
  aiGenerated?: boolean;
  generatedMessage?: string;
}

export const AgentMessage: React.FC<IAgentMessage> = ({ text, children, aiGenerated, generatedMessage }) => {
  // eslint-disable-next-line no-console
  console.log({ text });
  const content = typeof text === 'string' ? text : serializeToMarkdown(text);

  const isCodeBlock = content?.startsWith('```javascript');

  return (
    <div className={messageContainer}>
      <Markdown
        children={content}
        className={clsx('markdown', clsx(contentStyle({ isCodeBlock })))}
        remarkPlugins={[remarkGfm]}
        components={{
          code(props: any) {
            const { children, className, node, ref, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <span className={codeBlockContainer}>
                <CopyButton value={children} className={copyButton} />
                <SyntaxHighlighter
                  {...rest}
                  lineProps={{
                    style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap', paddingLeft: 0, paddingRight: 0 },
                  }}
                  wrapLines={true}
                  wrapLongLines={true}
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={codeTheme}
                />
              </span>
            ) : (
              <div {...rest} className={className}>
                {children}
              </div>
            );
          },
        }}
      />
      {children && <div className={embeddedContent}>{children}</div>}
      {aiGenerated && (
        <div className={generatedChin}>
          <Icon svg="ai" className={aiIconModifier} />
          <span>{generatedMessage}</span>
        </div>
      )}
    </div>
  );
};
