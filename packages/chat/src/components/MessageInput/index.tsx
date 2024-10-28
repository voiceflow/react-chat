import { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { SquareButton } from '../Buttons/SquareButton';
import { StopButton } from '../Buttons/StopButton';
import { SendButton } from '../SendButton';
import { buttonContainer, input, inputBlock, inputContainer, mockFocusRing } from './MessageInput.css';

export interface IMessageInput {
  onDictationClick?: () => void;
  placeholder?: string;
  onSubmit?: (message: string) => Promise<void>;
  disableSend?: boolean | undefined;
}

export const MessageInput: React.FC<IMessageInput> = ({ onSubmit, disableSend, placeholder = 'Message...' }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const sendMessage = async () => {
    if (!message || disableSend) return;

    setMessage('');
    await onSubmit?.(message);
  };

  return (
    <div className={inputContainer} onClick={handleContainerClick}>
      <div className={mockFocusRing} />
      <div className={inputBlock}>
        <TextareaAutosize
          placeholder={placeholder}
          minRows={1}
          autoFocus
          maxRows={5}
          ref={inputRef}
          value={message}
          className={input}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
      <div className={buttonContainer}>
        {!message?.length && !isRecording && (
          <SquareButton size="medium" iconName="microphone" onClick={() => setIsRecording(true)} />
        )}
        {isRecording && <StopButton onClick={() => setIsRecording(false)} />}
        <SendButton onClick={sendMessage} disabled={!message?.length} />
      </div>
    </div>
  );
};
