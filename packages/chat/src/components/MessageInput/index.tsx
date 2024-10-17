import { useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { chain } from '@/utils/functional';

import SendButton from '../SendButton';
import { SquareButton } from '../SquareButton';
import { buttonContainer, input, inputContainer } from './MessageInput.css';

interface IMessageInput {
  message: string;
  onValueChange: (value: string) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

export const MessageInput: React.FC<IMessageInput> = ({ message, onValueChange, onChange, placeholder }) => {
  const handleChange = chain(onChange, (event) => onValueChange(event.target.value));

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={inputContainer} onClick={handleContainerClick}>
      <TextareaAutosize
        placeholder={placeholder}
        minRows={1}
        autoFocus
        maxRows={5}
        ref={inputRef}
        value={message}
        className={input}
        onChange={handleChange}
      />
      <div className={buttonContainer}>
        <SquareButton size="medium" iconName="microphone" />
        <SendButton disabled={!message?.length} />
      </div>
    </div>
  );
};

// <div className={inputContainer} onClick={handleContainerClick}>
//   <div className={mockFocus} />
//   <TextareaAutosize
//     placeholder={placeholder}
//     minRows={1}
//     maxRows={5}
//     ref={inputRef}
//     value={message}
//     className={input}
//     onChange={handleChange}
//   />
// </div>
