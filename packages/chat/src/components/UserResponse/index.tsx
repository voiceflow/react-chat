import { ClassName } from '@/constants';
import { useAutoScroll } from '@/hooks/useAutoScroll';

import { MessageContainer } from '../MessageContainer';
import { Tooltip } from '../Tooltip';
import { debugMessage, messageContainer } from './styles.css';

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
}

/**
 * A user-sent text response.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-chat-userresponse--simple}
 */
export const UserResponse: React.FC<UserResponseProps> = ({ message, debug, isFirst }) => {
  useAutoScroll();

  // TODO: Check this in different render modes
  //       In the 'old' chat app - Messages have a maximum width in different screen modes.
  //       Should we preserve this ?
  // const { config } = useContext(RuntimeStateAPIContext);

  return (
    <MessageContainer className={ClassName.USER_RESPONSE}>
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
