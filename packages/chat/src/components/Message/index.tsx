import './markdown-styles.css';

import clsx from 'clsx';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';

import Icon from '../Icon';
import codeTheme from './code-theme';
import { aiIconModifier, generatedChin, messageContainer } from './Message.css';
import { isCodeBlock } from './utils/is-code-block';

interface IMessage {
  children: React.ReactNode;
  from: 'system' | 'user';
  generated?: boolean;
}

export const Message: React.FC<IMessage> = ({ children, generated }) => {
  const isCodeResponse = isCodeBlock(children);

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
      {generated && (
        <div className={generatedChin}>
          <Icon svg="ai" className={aiIconModifier} />
          Generate by AI, double-check for accuracy.
        </div>
      )}
    </>
  );
};
