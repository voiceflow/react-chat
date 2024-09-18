import type { VariantProp } from '@/types';

import { AvatarContainer } from './styled';

export interface AvatarProps extends React.ComponentProps<typeof AvatarContainer> {
  /**
   * An image URL which will be rendered as the background.
   */
  avatar: string;

  /**
   * Pre-defined size variants.
   *
   * @default 'small'
   */
  size?: VariantProp<typeof AvatarContainer, 'size'>;
}

const Avatar: React.FC<AvatarProps> = ({ avatar, ...props }) => (
  <AvatarContainer {...props} css={{ backgroundImage: `url(${avatar})`, ...props.css }} />
);

/**
 * Displays an image in a circular frame.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/core-avatar--small}
 */
export default Object.assign(Avatar, {
  Container: AvatarContainer,
});
