import { type ComponentPropsWithRef, forwardRef } from 'react';

import Button from '../Button';
import { SendIcon } from './SendIcon';
import { sendButtonStyle, sendIconStyle } from './styles.css';

interface SendButtonProps extends ComponentPropsWithRef<'button'> {
  disabled?: boolean;
  testID?: string;
}

const SendButton: React.FC<SendButtonProps> = forwardRef<HTMLButtonElement, SendButtonProps>(
  ({ disabled, testID, ...props }, ref) => (
    <Button ref={ref} className={sendButtonStyle({ disabled: !!disabled })} data-testid={testID} {...props}>
      <SendIcon className={sendIconStyle({ disabled: !!disabled })} />
    </Button>
  )
);

export default SendButton;
