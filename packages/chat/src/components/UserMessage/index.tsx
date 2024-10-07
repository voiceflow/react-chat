import { messageContainer } from './UserMessage.css';

interface IUserMessage {
  children: React.ReactNode;
  from: 'system' | 'user';
  generated?: boolean;
}

export const UserMessage: React.FC<IUserMessage> = ({ children }) => {
  return (
    <>
      <div className={messageContainer}>{children}</div>
    </>
  );
};
