import { serializeToMarkdown } from '@voiceflow/slate-serializer/markdown';
import clsx from 'clsx';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';

import codeTheme from '@/components/AgentMessage/code-theme';
import type { TextMessageProps } from '@/components/SystemResponse/types';
import { RuntimeStateAPIContext } from '@/contexts';

import { codeBlockContainer, contentStyle, messageContainer } from '../AgentMessage/AgentMessage.css';
import { CopyButton } from '../AgentMessage/CopyButton';
import { copyButton } from '../AgentMessage/CopyButton/CopyButton.css';
import { Markdown } from './Markdown';

export interface DefaultTextProps {
  /**
   * text whether in string or slate format
   */
  text: TextMessageProps['text'];
}

// this is just eslint being dumb because "allowDangerousHTML" contains "HTML"
const DefaultText: React.FC<DefaultTextProps> = ({ text }) => {
  const api = React.useContext(RuntimeStateAPIContext);

  const content = typeof text === 'string' ? text : serializeToMarkdown(text);

  if (api?.config?.allowDangerousHTML) {
    return (
      <div className={messageContainer}>
        <Markdown
          children={content}
          className={clsx('markdown', contentStyle())}
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
      </div>
    );
  }

  return (
    <div className={messageContainer}>
      <Markdown
        children={content}
        className={clsx('markdown', contentStyle())}
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
    </div>
  );
};

// memoize to prevent re-rendering
export const Text = React.memo(DefaultText);
