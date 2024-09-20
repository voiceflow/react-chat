import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';
import type { VariantProp } from '@/types';

export const tag = tagFactory(ClassName.IMAGE);

export const DefaultImageBase = styled(tag('img'), {
  variants: {
    isRounded: {
      true: {
        borderRadius: '$1',
      },
    },
    mode: {
      overlay: {
        width: 248,
      },
      embedded: {
        width: '100%',
        maxWidth: 512,
      },
    },
  },
  defaultVariants: {
    isRounded: true,
    mode: 'overlay',
  },
});

export interface DefaultImageProps extends React.ComponentProps<typeof DefaultImageBase> {
  /**
   * A URL for the image to render.
   */
  image: string | null;

  /**
   * If true, rounds the corners of the image border.
   *
   * @default true
   */
  isRounded?: VariantProp<typeof DefaultImageBase, 'isRounded'>;
}

const DefaultImage: React.FC<DefaultImageProps> = ({ image, ...props }) => (
  <DefaultImageBase {...props} src={image || undefined} />
);

/**
 * An image rendered as the `src` of an `<img>`.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/core-image--round-corners}
 */
export default Object.assign(DefaultImage, { Base: DefaultImageBase });
