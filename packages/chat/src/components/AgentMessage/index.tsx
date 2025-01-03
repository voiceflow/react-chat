import '../../styles.css';

import type { Text } from '@voiceflow/base-types';
import { serializeToMarkdown } from '@voiceflow/slate-serializer/markdown';
import clsx from 'clsx';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';

import { FeedbackButton } from '../FeedbackButton';
import { FeedbackButtonVariant, type IFeedbackButton } from '../FeedbackButton/FeedbackButton.interface';
import { Icon } from '../Icon';
import {
  agentMessageContainer,
  aiIconModifier,
  codeBlockContainer,
  contentStyle,
  copyButton,
  embeddedContent,
  feedbackButtonContainer,
  generatedChin,
  generatedChinContent,
  lastListItem,
  lastPElement,
  markdownParagraph,
} from './AgentMessage.css';
import codeTheme from './code-theme';
import { CopyButton } from './CopyButton';

interface IAgentMessage {
  text: string | Text.SlateTextValue;
  children?: React.ReactNode;
  ai?: boolean;
  disclaimerMessage?: string;

  isLast?: boolean;
  feedback?: IFeedbackButton | undefined;

  debug?: boolean;
  textContent?: string;
}

export const AgentMessage: React.FC<IAgentMessage> = ({
  text,
  children,
  ai,
  disclaimerMessage = 'Generated by AI, double-check for accuracy.',
  isLast,
  feedback,
  textContent,
}) => {
  const content = typeof text === 'string' ? text : serializeToMarkdown(text);

  const isCodeBlock = content?.startsWith('```javascript');

  return (
    <div className={clsx(agentMessageContainer)}>
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
          li: ({ children, ...props }) => {
            // NOTE: this accounts for when the last item in a response is a li and we remove the bottom margin from that.
            const position = props.node?.position;
            if (position && position.end.offset === text.length - 1) {
              return (
                <li className={lastListItem} {...props}>
                  {children}
                </li>
              );
            }
            return <li {...props}> {children}</li>;
          },
          p: ({ children, ...props }) => {
            const position = props.node?.position;
            const isFirst = position && position.start.offset === 0;
            const isLast = position && position.end.offset === text.length - 1;
            return (
              <p
                {...props}
                className={clsx(markdownParagraph({ first: isFirst }), isLast && lastListItem, lastPElement)}
              >
                {children}
              </p>
            );
          },
        }}
      />
      {children && <div className={embeddedContent}>{children}</div>}
      {ai && (
        <div className={generatedChin}>
          <Icon svg="ai" className={aiIconModifier} />
          <span className={generatedChinContent}>{disclaimerMessage}</span>
        </div>
      )}
      {feedback && !isLast && (
        <div className={feedbackButtonContainer}>
          <FeedbackButton {...feedback} textContent={textContent} variant={FeedbackButtonVariant.PREVIOUS_RESPONSE} />
        </div>
      )}
    </div>
  );
};
