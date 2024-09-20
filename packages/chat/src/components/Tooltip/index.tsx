import Message from '@/components/Message';

import type { DebugMessageProps } from '../Message/DebugMessage';
import { Button, Container } from './styled';

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
  <Container withAction={!!label}>
    <Message.Debug {...props}>{children}</Message.Debug>
    {label && <Button onClick={onClick}>{label}</Button>}
  </Container>
);

/**
 * Renders a {@link Message.Debug} with an optional action.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-tooltip--left-orientation}
 */
export default Object.assign(ActionMessage, {
  Button,
  Container,
});
