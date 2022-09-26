import { useState } from 'react';

import Button from '@/components/Button';
import ChatInput from '@/components/ChatInput';

import { Container, Watermark } from './styled';

export interface FooterProps {
  hasEnded?: boolean | undefined;
  onStart?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onSend?: ((message: string) => void) | undefined;
}

const Footer: React.FC<FooterProps> = ({ hasEnded, onStart, onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = (): void => {
    if (!message) return;

    onSend?.(message);
    setMessage('');
  };

  return (
    <Container withShadow={!hasEnded}>
      {hasEnded ? (
        <Button onClick={onStart}>Start New Chat</Button>
      ) : (
        // eslint-disable-next-line jsx-a11y/no-autofocus
        <ChatInput value={message} placeholder="Message…" autoFocus onValueChange={setMessage} onSend={handleSend} />
      )}
      <Watermark>
        Conversation ⚡️ by
        <a target="_blank" href="https://voiceflow.com" rel="noreferrer">
          Voiceflow
        </a>
      </Watermark>
    </Container>
  );
};

export default Object.assign(Footer, {
  Container,
  Watermark,
});
