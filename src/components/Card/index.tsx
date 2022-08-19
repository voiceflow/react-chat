import Button from '@/components/Button';
import Image from '@/components/Image';

import { Container, Content, Description, Header } from './styled';

export interface CardActionProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CardProps {
  title: string;
  description: string;
  image: string;
  actions?: CardActionProps[];
}

const Card: React.FC<CardProps> = ({ title, description, image, actions = [] }) => (
  <Container>
    <Image image={image} rounded={false} />
    <Content>
      <Header>{title}</Header>
      <Description>{description}</Description>
      {actions.map(({ label, onClick }, index) => (
        <Button onClick={onClick} key={index}>
          {label}
        </Button>
      ))}
    </Content>
  </Container>
);

export default Object.assign(Card, {
  Container,
});
