import { useContext } from 'react';

import Message from '@/components/Message';
import Timestamp from '@/components/Timestamp';
import Tooltip from '@/components/Tooltip';
import { RuntimeStateAPIContext } from '@/contexts';
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
  /**
   * The message text to display.
   */
  message: string;

  /**
   * A unix timestamp indicating when this response was sent.
   */
  timestamp: number;

  /**
   * If provided, adds a caption and optional "debug" message with an action.
   */
  debug?: DebugResponseProps;
}

const UserResponse: React.FC<UserResponseProps> = ({ message, timestamp, debug }) => {
  useAutoScroll();

  const { config } = useContext(RuntimeStateAPIContext);
  return (
    <Container mode={config.render.mode}>
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

/**
 * A user-sent text response.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-chat-userresponse--simple}
 */
export default Object.assign(UserResponse, {
  Container,
  Debug,
  Row,
});
