import clsx from 'clsx';

import { ClassName } from '@/constants';
import { DEFAULT_CHAT_AVATAR } from '@/dtos/AssistantOptions.dto';

import { Avatar } from '../Avatar';
import {
  avatarContainer,
  welcomeMessageContainer,
  welcomeMessageDescription,
  welcomeMessageTitle,
} from './WelcomeMessage.css';

export interface IWelcomeMessage {
  /**
   * Should we show the welcome message
   */
  enabled: boolean;

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
  avatar?: string;
}

export const WelcomeMessage: React.FC<IWelcomeMessage> = ({ enabled, title, description, avatar }) => {
  if (!enabled) return null;

  return (
    <div className={clsx(ClassName.ASSISTANT_INFO, welcomeMessageContainer)}>
      <div className={avatarContainer}>
        <Avatar size="large" avatar={avatar ?? DEFAULT_CHAT_AVATAR} />
      </div>
      <div className={welcomeMessageTitle} title={title}>
        {title}
      </div>
      <div className={welcomeMessageDescription} title={description}>
        {description}
      </div>
    </div>
  );
};
