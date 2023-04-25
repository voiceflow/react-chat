import { useState } from 'react';

import Button from '@/components/Button';
import ChatInput from '@/components/ChatInput';

import { Container, Watermark } from './styled';

export interface FooterProps {
  /**
   * If true, shows a watermark indicating that the conversation is powered by Voiceflow.
   */
  withWatermark: boolean;

  /**
   * If true, shows a prompt to start a new chat by calling the {@link onStart} handler.
   * If false, renders controls for the user to write a response.
   */
  hasEnded?: boolean | undefined;

  /**
   * A callback to start a new conversation.
   */
  onStart?: React.MouseEventHandler<HTMLButtonElement> | undefined;

  /**
   * A callback to submit a user response.
   */
  onSend?: ((message: string) => void) | undefined;
}

const Footer: React.FC<FooterProps> = ({ withWatermark, hasEnded, onStart, onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = (): void => {
    if (!message) return;

    onSend?.(message);
    setMessage('');
  };

  return (
    <Container withShadow={!!hasEnded} withWatermark={withWatermark}>
      {hasEnded ? (
        <Button onClick={onStart}>Start New Chat</Button>
      ) : (
        // eslint-disable-next-line jsx-a11y/no-autofocus
        <ChatInput value={message} placeholder="Message…" autoFocus onValueChange={setMessage} onSend={handleSend} />
      )}
      {withWatermark && (
        <Watermark>
          Assistant ⚡️ by
          <a target="_blank" href="https://voiceflow.com" rel="noreferrer">
            Voiceflow
          </a>
        </Watermark>
      )}
    </Container>
  );
};

/**
 * Footer for the chat widget; displays input controls or a prompt to restart the conversation.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/docs/components-chat-footer--running}
 */
export default Object.assign(Footer, {
  Container,
  Watermark,
});
