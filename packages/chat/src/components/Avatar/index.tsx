import type { RecipeVariants } from '@vanilla-extract/recipes';
import clsx from 'clsx';

import { ClassName } from '@/constants';

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

  /**
   * Class name to pass into the Avatar component.
   */
  className?: string;

  /**
   * Flag to remove the background from the Avatar.
   */
  withoutBackground?: boolean;
}

/**
 * Displays an image in a circular frame.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/core-avatar--small}
 */
export const Avatar: React.FC<AvatarProps> = ({ avatar, size, className, withoutBackground = false }) => (
  <div
    className={clsx(ClassName.AVATAR, avatarStyles({ size, withoutBackground }), className)}
    style={{ backgroundImage: `url(${avatar})` }}
  ></div>
);
