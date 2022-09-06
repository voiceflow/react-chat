import { useLayoutEffect, useRef } from 'react';

import Message from '@/components/Message';
import Tooltip from '@/components/Tooltip';
import { useAutoScroll } from '@/hooks';

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

  useAutoScroll();

  useLayoutEffect(() => {
    const frameEl = frameRef.current;
    const messageEl = messageRef.current;
    if (!frameEl || !messageEl) return;

    const { width } = messageEl.getBoundingClientRect();

    frameEl.style.width = `${Math.ceil(width)}px`;
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
