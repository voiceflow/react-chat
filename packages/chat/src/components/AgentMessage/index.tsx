import '../../styles.css';

import clsx from 'clsx';
import React from 'react';

import Icon from '../Icon';
import { aiIconModifier, contentStyle, generatedChin, messageContainer } from './AgentMessage.css';
import { MarkdownMessage } from './Markdown';

interface IAgentMessage {
  children: React.ReactNode;
  from: 'system' | 'user';
  generated?: boolean;
  generatedMessage?: string;
}

const AgentMessage: React.FC<IAgentMessage> = ({ children, generated, generatedMessage }) => {
  const content = children?.toString();
  const isNode = React.isValidElement(children);

  const isCodeBlock =
    (content?.startsWith('```') && (content?.endsWith('```') || content.endsWith('```\n'))) ||
    content?.startsWith('\n```');

  return (
    <div className={messageContainer}>
      <div className={clsx(contentStyle({ isCodeBlock }))}>
        {isNode && children}
        {!isNode && !isCodeBlock && <MarkdownMessage>{content}</MarkdownMessage>}
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
