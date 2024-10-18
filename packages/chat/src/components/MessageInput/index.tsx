import { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { SquareButton } from '../Buttons/SquareButton';
import { StopButton } from '../Buttons/StopButton';
import SendButton from '../SendButton';
import { buttonContainer, input, inputBlock, inputContainer, mockFocusRing } from './MessageInput.css';

export interface IMessageInput {
  message: string;
  onValueChange: (value: string) => void;
  onDictationClick?: () => void;
  placeholder: string;
  onSubmit: () => void;
}

export const MessageInput: React.FC<IMessageInput> = ({
  message,
  onSubmit,
  onValueChange,
  placeholder = 'Message...',
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleContainerClick = () => {
    inputRef.current?.focus();
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
          onChange={(event) => onValueChange(event.target.value)}
        />
      </div>
      <div className={buttonContainer}>
        {!message?.length && !isRecording && (
          <SquareButton size="medium" iconName="microphone" onClick={() => setIsRecording(true)} />
        )}
        {isRecording && <StopButton onClick={() => setIsRecording(false)} />}
        <SendButton onClick={() => onSubmit()} disabled={!message?.length} />
      </div>
    </div>
  );
};
