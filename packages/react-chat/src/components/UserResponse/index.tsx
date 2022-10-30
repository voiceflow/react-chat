import Message from '@/components/Message';
import Timestamp from '@/components/Timestamp';
import Tooltip from '@/components/Tooltip';
import { useAutoScroll } from '@/hooks';

import { Container, Debug, Row } from './styled';

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
  timestamp: number;
  debug?: DebugResponseProps;
}

const UserResponse: React.FC<UserResponseProps> = ({ message, timestamp, debug }) => {
  useAutoScroll();

  return (
    <Container>
      <Row>
        <Timestamp value={timestamp} />
        <Message from="user">{message}</Message>
      </Row>
      {debug && (
        <>
          <Debug>{debug.message}</Debug>
          {debug.reason && (
            <Tooltip label={debug.action?.label} onClick={debug.action?.onClick} orientation="right">
              {debug.reason}
            </Tooltip>
          )}
        </>
      )}
    </Container>
  );
};

export default Object.assign(UserResponse, {
  Container,
  Debug,
  Row,
});
