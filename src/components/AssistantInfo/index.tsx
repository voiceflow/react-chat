import Avatar from '@/components/Avatar';

import { Container, Description, Title } from './styled';

export interface AssistantHeaderProps {
  name: string;
  description: string;
  image: string;
}

const AssistantHeader: React.FC<AssistantHeaderProps> = ({ name, description, image }) => (
  <Container>
    <Avatar size="large" image={image} />
    <Title>{name}</Title>
    <Description>{description}</Description>
  </Container>
);

export default Object.assign(AssistantHeader, {
  Container,
  Title,
  Description,
});
