import type { RuntimeAction, SendMessage } from '@/common';
import Button from '@/components/Button';
import Image from '@/components/Image';

import { Container, Content, Description, Header } from './styled';

export interface CardActionProps {
  name: string;
  request: RuntimeAction;
}

export interface CardProps {
  title: string;
  description: string;
  image?: string | undefined | null;
  actions?: CardActionProps[] | undefined;
  send?: SendMessage | undefined;
}

const Card: React.FC<CardProps> = ({ title, send, description, image, actions = [] }) => (
  <Container>
    {!!image && <Image image={image} rounded={false} />}
    <Content>
      <Header>{title}</Header>
      <Description>{description}</Description>
      {actions.map(({ name, request }, index) => (
        <Button onClick={() => send?.(name, request)} key={index}>
          {name}
        </Button>
      ))}
    </Content>
  </Container>
);

export default Object.assign(Card, {
  Container,
});
