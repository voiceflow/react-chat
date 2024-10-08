import type { RecipeVariants } from '@vanilla-extract/recipes';

import { avatarStyles } from './styles.css';

type AvatarVariants = NonNullable<RecipeVariants<typeof avatarStyles>>;

export interface AvatarProps {
  /**
   * An image URL which will be rendered as the background.
   */
  avatar: string;

  /**
   * Pre-defined size variants.
   *
   * @default 'small'
   */
  size?: AvatarVariants['size'];
}

const Avatar: React.FC<AvatarProps> = ({ avatar, ...props }) => (
  <div className={avatarStyles({ size: props.size })} style={{ backgroundImage: `url(${avatar})` }}></div>
);

/**
 * Displays an image in a circular frame.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/core-avatar--small}
 */
export default Avatar;
