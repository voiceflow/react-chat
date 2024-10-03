import Button from '../Button';
import { SendIcon } from './SendIcon';
import { sendButtonStyles } from './styles.css';

interface SendButtonProps {
  disabled?: boolean;
}

const SendButton: React.FC<SendButtonProps> = (props) => (
  <Button className={sendButtonStyles({ disabled: props.disabled })}>
    <SendIcon />
  </Button>
);

export default SendButton;
