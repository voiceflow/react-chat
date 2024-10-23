import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { COLORS, createPalette } from '@/styles/colors';

import { SquareButton } from '../Buttons/SquareButton';
import { StopButton } from '../Buttons/StopButton';
import SendButton from '../SendButton';
import { buttonContainer, input, inputBlock, inputContainer, mockFocusRing, themedFocusRing } from './MessageInput.css';

export interface IMessageInput {
  message: string;
  onValueChange: (value: string) => void;
  onDictationClick?: () => void;
  placeholder: string;
  onSubmit: () => void;
  primaryColor?: string;
}

export const MessageInput: React.FC<IMessageInput> = ({
  message,
  onSubmit,
  onValueChange,
  placeholder = 'Message...',
  primaryColor,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const messageColor = primaryColor ? createPalette(primaryColor)[500] : COLORS.ACCENT[500];

  return (
    <div className={inputContainer} onClick={handleContainerClick}>
      <div style={assignInlineVars({ [themedFocusRing]: messageColor })} className={mockFocusRing} />
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
        <SendButton color={primaryColor} onClick={() => onSubmit()} disabled={!message?.length} />
      </div>
    </div>
  );
};
