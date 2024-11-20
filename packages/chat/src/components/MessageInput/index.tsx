import type { Key } from 'react';
import { useEffect, useRef, useState } from 'react';
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
  hasEnded?: boolean;
}

export const MessageInput: React.FC<IMessageInput> = ({
  onSubmit,
  disableSend,
  audioInterface,
  placeholder = 'Message...',
  speechRecognition: customSpeechRecognition,
  hasEnded,
}) => {
  const [message, setMessage] = useState('');
  const [isMultiLine, setIsMultiLine] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [resizeTrigger, setResizeTrigger] = useState(false);

  const speechRecognition = useSpeechRecognition({
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

    speechRecognition.stopListening();
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

  const onHeightChange = (height: number) => {
    setIsMultiLine(height > 24);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      // Toggle the resize trigger state
      setResizeTrigger((prev) => !prev);
    });

    resizeObserver.observe(container);

    // eslint-disable-next-line consistent-return
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={inputContainer({ multiline: isMultiLine, hasEnded })}
      onKeyDown={handleKeyPress}
      onClick={handleContainerClick}
    >
      <div className={mockFocusRing({ multiline: isMultiLine })} />
      <div className={inputBlock}>
        <TextareaAutosize
          ref={speechRecognition.textareaRef}
          key={resizeTrigger as unknown as Key}
          placeholder={placeholder}
          autoFocus
          minRows={1}
          maxRows={5}
          value={message}
          className={input}
          onHeightChange={onHeightChange}
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
