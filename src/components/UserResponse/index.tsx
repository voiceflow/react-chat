import { useLayoutEffect, useRef } from 'react';

import Message from '@/components/Message';
import Tooltip from '@/components/Tooltip';

import { Container, Debug, Frame } from './styled';

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

const UserResponse: React.FC<UserResponseProps> = ({ message, debug }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const frameEl = frameRef.current;
    const messageEl = messageRef.current;
    if (!frameEl || !messageEl) return;

    frameEl.style.width = `${messageEl.clientWidth}px`;
  }, [message]);

  return (
    <Container>
      <Frame ref={frameRef}>
        <Message from="user" ref={messageRef}>
          {message}
        </Message>
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
      </Frame>
    </Container>
  );
};

export default Object.assign(UserResponse, {
  Container,
  Debug,
});
