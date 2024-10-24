import clsx from 'clsx';

import { ClassName } from '@/constants';

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
    <div className={clsx(ClassName.ASSISTANT_INFO, welcomeMessageContainer)}>
      <div className={avatarContainer}>
        <Avatar size="large" avatar={avatar} />
      </div>
      <div className={welcomeMessageTitle}>{title}</div>
      <div className={welcomeMessageDescription}>{description}</div>
    </div>
  );
};
