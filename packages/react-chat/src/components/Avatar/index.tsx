import { AvatarContainer } from './styled';

export interface AvatarProps extends React.ComponentProps<typeof AvatarContainer> {
  image: string;
}

const Avatar: React.FC<AvatarProps> = ({ image, ...props }) => (
  <AvatarContainer {...props} css={{ backgroundImage: `url(${image})`, ...props.css }} />
);

export default Object.assign(Avatar, {
  Container: AvatarContainer,
});
