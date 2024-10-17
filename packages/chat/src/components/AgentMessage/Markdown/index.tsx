import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';

import codeTheme from '../code-theme';
import { CopyButton } from '../CopyButton';
import { codeBlockContainer, copyButton } from './Markdown.css';

interface IMarkdownMessage {
  children: React.ReactNode;
}

export const MarkdownMessage: React.FC<IMarkdownMessage> = ({ children }) => {
  return (
    <Markdown
      children={children?.toString()}
      className={'markdown'}
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
  );
};
