import '../../styles.css';

import clsx from 'clsx';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';

import Icon from '../Icon';
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
  message: string;
  children?: React.ReactNode;
  from: 'system' | 'user';
  generated?: boolean;
  generatedMessage?: string;
}

const AgentMessage: React.FC<IAgentMessage> = ({ message, children, generated, generatedMessage }) => {
  const content = typeof message === 'string' ? message : '';
  const isCodeBlock =
    (content?.startsWith('```') && (content?.endsWith('```') || content.endsWith('```\n'))) ||
    content?.startsWith('\n```');

  return (
    <div className={messageContainer}>
      <div>
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
        <div className={embeddedContent}>{children}</div>
      </div>
      {generated && (
        <div className={generatedChin}>
          <Icon svg="ai" className={aiIconModifier} />
          <span>{generatedMessage}</span>
        </div>
      )}
    </div>
  );
};

export default AgentMessage;
