import { useRef } from 'react';

import { chain } from '@/utils/functional';

import { input, inputContainer, mockFocus } from './MessageInput.css';

interface IMessageInput {
  message: string;
  onValueChange: (value: string) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const MessageInput: React.FC<IMessageInput> = ({ onValueChange, onChange, placeholder }) => {
  const handleChange = chain(onChange, (event) => onValueChange(event.target.value));

  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={inputContainer} onClick={handleContainerClick}>
      <div className={mockFocus} />
      <input placeholder={placeholder} ref={inputRef} className={input} onChange={handleChange} />
    </div>
  );
};
