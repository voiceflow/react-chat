import type { RecipeVariants } from '@vanilla-extract/recipes';

import { avatarStyles } from './styles.css';
import clsx from 'clsx';
import { ClassName } from '@/constants';

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

/**
 * Displays an image in a circular frame.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/core-avatar--small}
 */
export const Avatar: React.FC<AvatarProps> = ({ avatar, ...props }) => (
  <div
    className={clsx(ClassName.AVATAR, avatarStyles({ size: props.size }))}
    style={{ backgroundImage: `url(${avatar})` }}
  ></div>
);
