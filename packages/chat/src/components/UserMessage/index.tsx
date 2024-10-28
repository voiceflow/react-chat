import type { DebugResponseProps } from '../UserResponse';
import { messageContainer } from './UserMessage.css';

interface IUserMessage {
  generated?: boolean;
  key?: string;
  message?: string;
  debug?: DebugResponseProps;
  timestamp?: number;
  color?: string;
}

// TODO: Add debug messages, and tooltips for it
export const UserMessage: React.FC<IUserMessage> = ({ message }) => {
  return <div className={messageContainer}>{message}</div>;
};
