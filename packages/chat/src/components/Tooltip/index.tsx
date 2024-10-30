import { DebugMessage, type DebugMessageProps } from '../Message/DebugMessage';
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

/**
 * Renders a tooltip, optionally with an action button attached to it.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-tooltip--left-orientation}
 */
export const Tooltip: React.FC<ActionMessageProps> = ({ label, onClick, children, ...props }) => (
  <div className={containerStyle({ withActionVariant: !!label })}>
    <DebugMessage {...props}>{children}</DebugMessage>
    {label && (
      <button className={buttonStyle} onClick={onClick}>
        {label}
      </button>
    )}
  </div>
);
