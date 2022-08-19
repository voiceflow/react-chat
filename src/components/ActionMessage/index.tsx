import { VariantProps } from '@stitches/react';

import Message from '@/components/Message';

import { Button, Container } from './styled';

export interface ActionMessageProps extends React.PropsWithChildren, VariantProps<typeof Message.Debug> {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ActionMessage: React.FC<ActionMessageProps> = ({ label, onClick, children, ...props }) => (
  <Container>
    <Message.Debug {...props}>{children}</Message.Debug>
    <Button onClick={onClick}>{label}</Button>
  </Container>
);

export default Object.assign(ActionMessage, {
  Button,
  Container,
});
