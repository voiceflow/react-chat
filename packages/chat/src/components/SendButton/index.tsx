import Button from '../Button';
import { SendIcon } from './SendIcon';
import { sendButtonStyle, sendIconStyle } from './styles.css';

interface SendButtonProps {
  disabled?: boolean;
}

const SendButton: React.FC<SendButtonProps> = (props) => (
  <Button className={sendButtonStyle({ disabled: !!props.disabled })}>
    <SendIcon className={sendIconStyle({ disabled: !!props.disabled })} />
  </Button>
);

export default SendButton;
