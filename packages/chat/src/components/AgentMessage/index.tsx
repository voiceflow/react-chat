// import './markdown-styles.css';

import clsx from 'clsx';
import Markdown from 'react-markdown';

import { generatedChin, messageContainer } from './AgentMessage.css';

interface IAgentMessage {
  children: React.ReactNode;
  from: 'system' | 'user';
  generated?: boolean;
}

export const AgentMessage: React.FC<IAgentMessage> = ({ children, generated }) => {
  const isCodeBlock = (children: React.ReactNode): boolean => {
    if (typeof children === 'string') {
      return (
        (children.startsWith('```') && (children.endsWith('```') || children.endsWith('```\n'))) ||
        children.startsWith('\n```')
      );
    }
    return false;
  };
  const isCodeResponse = isCodeBlock(children);

  return (
    <>
      <div className={clsx('markdown', messageContainer({ isCodeBlock: !!isCodeResponse, generated }))}>
        <Markdown children={children?.toString()} />
      </div>
      {generated && <div className={generatedChin}>Generate by AI, double-check for accuracy.</div>}
    </>
  );
};
