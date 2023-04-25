import Avatar from '@/components/Avatar';

import { Container, Description, Title } from './styled';

export interface AssistantInfoProps {
  /**
   * The title of the assistant.
   */
  title: string;

  /**
   * A short description of the assistant to help frame the conversation.
   */
  description: string;

  /**
   * An image URL that identifies the assistant, such as a brand icon.
   */
  avatar: string;
}

const AssistantInfo: React.FC<AssistantInfoProps> = ({ title, description, avatar }) => (
  <Container>
    <Avatar size="large" avatar={avatar} />
    <Title>{title}</Title>
    <Description>{description}</Description>
  </Container>
);

/**
 * This component displays introductory information about the assistant.
 * It will act as a placeholder before the conversation has started.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-chat-assistantinfo--default}
 */
export default Object.assign(AssistantInfo, {
  Container,
  Title,
  Description,
});
