import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import codeTheme from './code-theme';
import { messageContainer } from './Message.css';
import { isCodeBlock } from './utils/is-code-block';

interface IMessage {
  children: React.ReactNode;
}

export const Message: React.FC<IMessage> = ({ children }) => {
  const isCode = isCodeBlock(children);

  return (
    <div className={messageContainer({ isCodeBlock: !!isCode })}>
      <Markdown
        children={children?.toString()}
        components={{
          code(props) {
            const { children, className, node, ref, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                {...rest}
                wrapLines={true}
                wrapLongLines={true}
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={codeTheme}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};
