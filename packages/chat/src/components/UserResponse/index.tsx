import clsx from 'clsx';

import { ClassName } from '@/constants';
import { useAutoScroll } from '@/hooks/useAutoScroll';

import { Tooltip } from '../Tooltip';
import { UserMessage } from '../UserMessage';
import { debugMessage, messageContainer, messageRow } from './styles.css';

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
   * If true, this is the first message in the chat.
   */
  isFirst?: boolean;

  /**
   * If true, the chat is using an avatar.
   */

  hasAvatar?: boolean;
}

/**
 * A user-sent text response.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-chat-userresponse--simple}
 */
export const UserResponse: React.FC<UserResponseProps> = ({ message, debug, isFirst, hasAvatar }) => {
  useAutoScroll();

  // TODO: Check this in different render modes
  // const { config } = useContext(RuntimeStateAPIContext);

  return (
    <div className={clsx(ClassName.USER_RESPONSE, messageContainer)}>
      <div className={messageRow({ isFirst, hasAvatar })}>
        <UserMessage message={message} />
      </div>
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
    </div>
  );
};
