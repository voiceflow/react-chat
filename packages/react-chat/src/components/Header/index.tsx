import Avatar from '@/components/Avatar';
import Icon, { IconProps } from '@/components/Icon';

import { Button, Container, Title } from './styled';

export interface HeaderActionProps {
  svg: IconProps['svg'];
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface HeaderProps {
  title: string;
  image: string;
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

export default Object.assign(Header, {
  Container,
  Title,
  Button,
});
