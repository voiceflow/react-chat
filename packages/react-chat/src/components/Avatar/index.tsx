import { AvatarContainer } from './styled';

export interface AvatarProps extends React.ComponentProps<typeof AvatarContainer> {
  avatar: string;
}

const Avatar: React.FC<AvatarProps> = ({ avatar, ...props }) => (
  <AvatarContainer {...props} css={{ backgroundImage: `url(${avatar})`, ...props.css }} />
);

export default Object.assign(Avatar, {
  Container: AvatarContainer,
});
