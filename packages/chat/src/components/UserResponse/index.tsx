import clsx from 'clsx';

import { ClassName } from '@/constants';
import { useAutoScroll } from '@/hooks/useAutoScroll';

import { MessageContainer } from '../MessageContainer';
import { Tooltip } from '../Tooltip';
import { debugMessage, messageContainer, userResponse } from './styles.css';

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

  /**
   * If true, this is the last message in the chat.
   */
  isLast?: boolean;
}

/**
 * A user-sent text response.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-chat-userresponse--simple}
 */

export const UserResponse: React.FC<UserResponseProps> = ({ message, debug, isLast }) => {
  useAutoScroll();

  // TODO: Check this in different render modes
  //       In the 'old' chat app - Messages have a maximum width in different screen modes.
  //       Should we preserve this ?
  // const { config } = useContext(RuntimeStateAPIContext);

  return (
    <MessageContainer className={clsx(ClassName.USER_RESPONSE, userResponse)} isLast={isLast}>
      <div className={messageContainer}>{message}</div>
      {debug && (
        <>
          <aside className={debugMessage}>{debug.message}</aside>
          {debug.reason && (
            <Tooltip label={debug.action?.label} onClick={debug.action?.onClick} orientation="right">
              {debug.reason}
            </Tooltip>
          )}
        </>
      )}
    </MessageContainer>
  );
};
