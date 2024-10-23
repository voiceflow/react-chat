import mockAvatar from '../../assets/blank-image.png';
import { AgentMessage } from '../AgentMessage';
import Avatar from '../Avatar';
import { UserMessage } from '../UserMessage';
import { WelcomeMessage } from '../WelcomeMessage';
import { agentMessage, avatarContainer, messagesContainer, userMessage } from './Dialog.css';

interface IDialog {
  messages: { from: string; text: string }[];
  showPoweredBy?: boolean;
}

export const Dialog: React.FC<IDialog> = ({ messages, showPoweredBy }) => {
  return (
    <div className={messagesContainer({ showPoweredBy })}>
      <WelcomeMessage
        avatar={mockAvatar}
        title="ChatKit V2"
        description="Hi, I'm your new chat kit! Let's make some cool stuff."
      />
      {messages.map((msg, idx) => {
        const isMessageSameAsPrevious = idx > 0 && messages[idx - 1].from === msg.from;
        return (
          <div
            key={`${msg}-${idx}`}
            className={
              msg.from === 'system'
                ? agentMessage({ tight: isMessageSameAsPrevious })
                : userMessage({ tight: isMessageSameAsPrevious })
            }
          >
            {msg.from === 'system' && (
              <div className={avatarContainer}>
                <Avatar avatar={mockAvatar} />
              </div>
            )}
            {msg.from === 'system' ? (
              <AgentMessage from="system">{msg.text}</AgentMessage>
            ) : (
              <UserMessage from="user">{msg.text}</UserMessage>
            )}
          </div>
        );
      })}
    </div>
  );
};
