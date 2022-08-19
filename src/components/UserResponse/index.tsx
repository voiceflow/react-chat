import Message from '@/components/Message';

import { Container, Debug } from './styled';

export interface DebugActionProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface DebugResponseProps {
  message: string;
  reason?: string;
  action?: DebugActionProps;
}

export interface UserResponseProps {
  message: string;
  debug?: DebugResponseProps;
}

const UserResponse: React.FC<UserResponseProps> = ({ message, debug }) => (
  <Container>
    <Message from="user">{message}</Message>
    {debug && (
      <>
        <Debug>{debug.message}</Debug>
      </>
    )}
  </Container>
);

export default Object.assign(UserResponse, {
  Container,
  Debug,
});
