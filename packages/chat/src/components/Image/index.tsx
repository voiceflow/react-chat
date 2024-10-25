import clsx from 'clsx';

import { ClassName } from '@/constants';
import type { RenderMode } from '@/main';

import { imageStyles } from './styles.css';

export interface DefaultImageProps {
  /**
   * A URL for the image to render.
   */
  image: string | null;

  /**
   * The mode which we're rendering the chat widget.
   * This effects the way we show images.
   */
  mode?: RenderMode;

  /**
   * If true, rounds the corners of the image border.
   *
   * @default true
   */
  isRounded?: boolean;
}

/**
 * An image rendered as the `src` of an `<img>`.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/core-image--round-corners}
 */
export const Image: React.FC<DefaultImageProps> = ({ image, ...props }) => (
  <img
    className={clsx(ClassName.IMAGE, imageStyles({ rounded: props.isRounded }))}
    src={image || undefined}
    {...props}
  />
);
