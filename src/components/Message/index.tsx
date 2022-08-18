import { Container } from './styled';

const Message: React.FC<React.ComponentProps<typeof Container>> = (props) => <Container {...props} />;

export default Object.assign(Message, {
  Container,
});
