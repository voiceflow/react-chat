import mockAvatar from '../../assets/blank-image.png';
import { AgentMessage } from '../AgentMessage';
import Avatar from '../Avatar';
import { UserMessage } from '../UserMessage';
import { WelcomeMessage } from '../WelcomeMessage';
import { agentMessage, avatarContainer, dialogContainer, messagesContainer, userMessage } from './Dialog.css';

interface IDialog {
  messages: { from: string; text: string }[];
  showPoweredBy?: boolean;
  color?: string;
}

export const Dialog: React.FC<IDialog> = ({ messages, showPoweredBy, color }) => {
  return (
    <div className={dialogContainer({ showPoweredBy })}>
      <WelcomeMessage
        avatar={mockAvatar}
        title="ChatKit V2"
        description="Hi, I'm your new chat kit! Let's make some cool stuff."
      />
      <div className={messagesContainer}>
        {messages.map((msg, idx) => {
          const isMessageSameAsPrevious = idx > 0 && messages[idx - 1].from === msg.from;
          return (
            <div
              key={`${msg}-${idx}`}
              className={
                msg.from === 'system'
                  ? agentMessage({ tight: isMessageSameAsPrevious, isFirst: idx === 0 })
                  : userMessage({ tight: isMessageSameAsPrevious, isFirst: idx === 0 })
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
                <UserMessage color={color} from="user">
                  {msg.text}
                </UserMessage>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
