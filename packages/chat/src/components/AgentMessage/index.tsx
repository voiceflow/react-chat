import '../../styles.css';

import clsx from 'clsx';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';

import Icon from '../Icon';
import { aiIconModifier, generatedChin, messageContainer } from './AgentMessage.css';
import codeTheme from './code-theme';

interface IAgentMessage {
  children: React.ReactNode;
  from: 'system' | 'user';
  generated?: boolean;
  generatedMessage?: string;
}

export const AgentMessage: React.FC<IAgentMessage> = ({ children, generated, generatedMessage }) => {
  const content = children?.toString();

  const isCodeResponse =
    (content?.startsWith('```') && (content?.endsWith('```') || content.endsWith('```\n'))) ||
    content?.startsWith('\n```');

  return (
    <>
      <div className={clsx('markdown', messageContainer({ isCodeBlock: !!isCodeResponse, generated }))}>
        <Markdown
          children={children?.toString()}
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, node, ref, ...rest } = props;
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <>
                  {/* <CopyButton value={children} /> */}
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
                </>
              ) : (
                <div {...rest} className={className}>
                  {children}
                </div>
              );
            },
          }}
        />
      </div>
      {generated && (
        <div className={generatedChin}>
          <Icon svg="ai" className={aiIconModifier} />
          <span>{generatedMessage}</span>
        </div>
      )}
    </>
  );
};
