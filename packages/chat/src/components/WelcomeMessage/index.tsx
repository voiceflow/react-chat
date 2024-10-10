import Avatar from '../Avatar';
import {
  avatarContainer,
  welcomeMessageContainer,
  welcomeMessageDescription,
  welcomeMessageTitle,
} from './WelcomeMessage.css';

export interface IWelcomeMessage {
  /**
   * The title of the assistant.
   */
  title: string;

  /**
   * A short description of the assistant to help frame the conversation.
   */
  description: string;

  /**
   * An image URL that identifies the assistant, such as a brand icon.
   */
  avatar: string;
}

export const WelcomeMessage: React.FC<IWelcomeMessage> = ({ title, description, avatar }) => {
  return (
    <div className={welcomeMessageContainer}>
      <div className={avatarContainer}>
        <Avatar size="large" avatar={avatar} />
      </div>
      <h1 className={welcomeMessageTitle}>{title}</h1>
      <p className={welcomeMessageDescription}>{description}</p>
    </div>
  );
};
