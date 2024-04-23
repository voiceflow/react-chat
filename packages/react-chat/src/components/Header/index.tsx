import Avatar from '@/components/Avatar';
import type { IconProps } from '@/components/Icon';
import Icon from '@/components/Icon';

import { Button, Container, Title } from './styled';

export interface HeaderActionProps {
  /**
   * The name of the SVG icon that will be used for the button or a React component.
   *
   * @see {@link https://github.com/voiceflow/react-chat/tree/master/packages/react-chat/src/assets/svg the available icons}
   */
  svg: IconProps['svg'];

  /**
   * A callback that is executed when the button is clicked.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface HeaderProps {
  /**
   * The name of your assistant or title of the conversation.
   */
  title: string;

  /**
   * An image URL that will be rendered as a small {@link Avatar}.
   */
  image: string;

  /**
   * A list of actions that will appear as icon buttons.
   */
  actions?: HeaderActionProps[];
}

const Header: React.FC<HeaderProps> = ({ title, image, actions = [] }) => (
  <Container>
    <Avatar avatar={image} />
    <Title>{title}</Title>
    {actions.map(({ svg, onClick }, index) => (
      <Button onClick={onClick} key={index}>
        <Icon svg={svg} />
      </Button>
    ))}
  </Container>
);

/**
 * Header for the chat widget with image, title and controls.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/docs/components-chat-header--simple}
 */
export default Object.assign(Header, {
  Container,
  Title,
  Button,
});
