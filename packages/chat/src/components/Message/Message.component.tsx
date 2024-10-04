import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';

import codeTheme from './code-theme';
import { messageContainer } from './Message.css';
import { isCodeBlock } from './utils/is-code-block';

interface IMessage {
  children: React.ReactNode;
}

export const Message: React.FC<IMessage> = ({ children }) => {
  const isCodeResponse = isCodeBlock(children);

  return (
    <div className={messageContainer({ isCodeBlock: !!isCodeResponse })}>
      <Markdown
        children={children?.toString()}
        remarkPlugins={[remarkGfm]}
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
              <div {...rest} className={className}>
                {children}
              </div>
            );
          },
        }}
      />
    </div>
  );
};
