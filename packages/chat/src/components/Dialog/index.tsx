import type { TurnProps } from '@/types';

import mockAvatar from '../../assets/blank-image.png';
import { Avatar } from '../Avatar';
import { WelcomeMessage } from '../WelcomeMessage';
import { agentMessage, avatarContainer, dialogContainer, messagesContainer, userMessage } from './Dialog.css';

interface IDialog {
  messages: TurnProps[];
  showPoweredBy?: boolean;
}

export const Dialog: React.FC<IDialog> = ({ messages, showPoweredBy }) => {
  return (
    <div className={dialogContainer({ showPoweredBy })}>
      <WelcomeMessage
        avatar={mockAvatar}
        title="ChatKit V2"
        description="Hi, I'm your new chat kit! Let's make some cool stuff."
      />
      <div className={messagesContainer}>
        {messages.map((msg, idx) => {
          return (
            <div
              key={`${msg}-${idx}`}
              className={
                msg.type === 'system' ? agentMessage({ isFirst: idx === 0 }) : userMessage({ isFirst: idx === 0 })
              }
            >
              {msg.type === 'system' && (
                <div className={avatarContainer}>
                  <Avatar avatar={mockAvatar} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
