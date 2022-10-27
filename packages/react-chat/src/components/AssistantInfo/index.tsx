import Avatar from '@/components/Avatar';

import { Container, Description, Title } from './styled';

export interface AssistantHeaderProps {
  title: string;
  description: string;
  avatar: string;
}

const AssistantHeader: React.FC<AssistantHeaderProps> = ({ title, description, avatar }) => (
  <Container>
    <Avatar size="large" avatar={avatar} />
    <Title>{title}</Title>
    <Description>{description}</Description>
  </Container>
);

export default Object.assign(AssistantHeader, {
  Container,
  Title,
  Description,
});
