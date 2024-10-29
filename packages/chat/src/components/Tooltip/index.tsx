import Message from '@/components/Message';

import type { DebugMessageProps } from '../Message/DebugMessage';
import { buttonStyle, containerStyle } from './styled.css';

export interface ActionMessageProps extends DebugMessageProps {
  /**
   * If provided, this will render an action button within the tooltip.
   */
  label?: string | undefined;

  /**
   * A callback handler for the action button.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const ActionMessage: React.FC<ActionMessageProps> = ({ label, onClick, children, ...props }) => (
  <div className={containerStyle({ withActionVariant: !!label })}>
    <Message.Debug {...props}>{children}</Message.Debug>
    {label && (
      <button className={buttonStyle} onClick={onClick}>
        {label}
      </button>
    )}
  </div>
);

/**
 * Renders a {@link Message.Debug} with an optional action.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-tooltip--left-orientation}
 */
export default Object.assign(ActionMessage);
