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
   * If true, shows a prompt to start a new chat by calling the {@link FooterProps.onStart} handler.
   * If false, renders controls for the user to write a response.
   */
  hasEnded?: boolean | undefined;

  /**
   * Do not allow a user to send a message while the assistant is processing a response.
   */
  disableSend?: boolean | undefined;

  /**
   * A callback to start a new conversation.
   */
  onStart?: (() => Promise<void>) | undefined;

  /**
   * A callback to submit a user response.
   */
  onSend?: ((message: string) => Promise<void>) | undefined;
}

const Footer: React.FC<FooterProps> = ({ withWatermark, hasEnded, disableSend, onStart, onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = async (): Promise<void> => {
    if (!message || disableSend) return;

    setMessage('');
    await onSend?.(message);
  };

  return (
    <Container withShadow={!!hasEnded} withWatermark={withWatermark}>
      {hasEnded ? (
        <Button onClick={onStart}>Start New Chat</Button>
      ) : (
        <ChatInput
          value={message}
          placeholder="Message…"
          autoFocus
          onValueChange={setMessage}
          onSend={handleSend}
          disableSend={disableSend}
        />
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
