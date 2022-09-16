import Message from '@/components/Message';

import { Button, Container } from './styled';

export interface ActionMessageProps extends React.ComponentProps<typeof Message.Debug> {
  label?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const ActionMessage: React.FC<ActionMessageProps> = ({ label, onClick, children, ...props }) => (
  <Container withAction={!!label}>
    <Message.Debug {...props}>{children}</Message.Debug>
    {label && <Button onClick={onClick}>{label}</Button>}
  </Container>
);

export default Object.assign(ActionMessage, {
  Button,
  Container,
});
