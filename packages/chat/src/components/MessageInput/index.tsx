import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import type { ChatSpeechRecognitionConfig } from '@/main';

import { SendButton } from '../SendButton';
import { AudioInputButton } from './AudioInputButton';
import { useSpeechRecognition } from './hooks';
import { buttonContainer, input, inputBlock, inputContainer, mockFocusRing } from './MessageInput.css';

export interface IMessageInput {
  onDictationClick?: () => void;
  placeholder?: string;
  onSubmit?: (message: string) => Promise<void>;
  disableSend?: boolean | undefined;
  audioInterface?: boolean | undefined;
  speechRecognition?: ChatSpeechRecognitionConfig;
}

export const MessageInput: React.FC<IMessageInput> = ({
  onSubmit,
  disableSend,
  audioInterface,
  placeholder = 'Message...',
  speechRecognition: customSpeechRecognition,
}) => {
  const [message, setMessage] = useState('');

  const speechRecognition = useSpeechRecognition({
    onSend: () => onSubmit?.(''),
    onValueChange: setMessage,
    customSpeechRecognition,
  });
  const withSendButton = !!message?.length && !disableSend && !speechRecognition.listening;
  const withAudioInput =
    audioInterface && speechRecognition.available && speechRecognition.microphoneAvailable && !withSendButton;

  const handleContainerClick = () => {
    speechRecognition.textareaRef.current?.focus();
  };

  const sendMessage = async () => {
    if (!message || disableSend) return;

    setMessage('');
    await onSubmit?.(message);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const { shiftKey } = event;

    if (event.key !== 'Enter') return;
    if (event.key === 'Enter' && !shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={inputContainer} onKeyDown={handleKeyPress} onClick={handleContainerClick}>
      <div className={mockFocusRing} />
      <div className={inputBlock}>
        <TextareaAutosize
          ref={speechRecognition.textareaRef}
          placeholder={placeholder}
          minRows={1}
          autoFocus
          maxRows={5}
          value={message}
          className={input}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
      <div className={buttonContainer}>
        {withAudioInput && (
          <AudioInputButton
            onStop={speechRecognition.stopListening}
            onStart={speechRecognition.startListening}
            listening={speechRecognition.listening}
            processing={speechRecognition.processing}
            initializing={speechRecognition.initializing}
          />
        )}
        <SendButton onClick={sendMessage} disabled={!message?.length} />
      </div>
    </div>
  );
};
