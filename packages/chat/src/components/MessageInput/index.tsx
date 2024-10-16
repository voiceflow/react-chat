import { chain } from '@/utils/functional';

import Icon from '../Icon';
import { buttonContainer, input, inputContainer } from './MessageInput.css';

interface IMessageInput {
  message: string;
  onValueChange: (value: string) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const MessageInput: React.FC<IMessageInput> = ({ onValueChange, onChange, placeholder }) => {
  const handleChange = chain(onChange, (event) => onValueChange(event.target.value));

  return (
    <div className={inputContainer}>
      <input placeholder={placeholder} className={input} onChange={handleChange} />
    </div>
  );
};

// <div className={buttonContainer}>
//   <Icon svg="voice" />
// </div>
