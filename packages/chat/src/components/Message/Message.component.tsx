import Markdown from 'react-markdown';

import { messageContainer } from './Message.css';

interface IMessage {
  children: React.ReactNode;
}

export const Message: React.FC<IMessage> = ({ children }) => {
  return (
    <div className={messageContainer}>
      <Markdown>{children?.toString()}</Markdown>
    </div>
  );
};
