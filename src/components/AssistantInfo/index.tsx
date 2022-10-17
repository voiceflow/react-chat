import Avatar from '@/components/Avatar';

import { Container, Description, Title } from './styled';

export interface AssistantHeaderProps {
  title: string;
  description: string;
  image: string;
}

const AssistantHeader: React.FC<AssistantHeaderProps> = ({ title, description, image }) => (
  <Container>
    <Avatar size="large" image={image} />
    <Title>{title}</Title>
    <Description>{description}</Description>
  </Container>
);

export default Object.assign(AssistantHeader, {
  Container,
  Title,
  Description,
});
