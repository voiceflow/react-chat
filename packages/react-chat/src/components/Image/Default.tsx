import { ClassName } from '@/constants';
import { useStitches } from '@/contexts';
import { tagFactory } from '@/hocs';
import { VariantProp } from '@/types';

export const tag = tagFactory(ClassName.IMAGE);

export const DefaultImageBase = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('img'), {
    width: 248,

    variants: {
      isRounded: {
        true: {
          borderRadius: '$1',
        },
      },
    },
    defaultVariants: {
      isRounded: true,
    },
  });
  return <Styled {...props} />;
};

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

const DefaultImage: React.FC<DefaultImageProps> = ({ image, ...props }) => <DefaultImageBase {...props} src={image || undefined} />;

/**
 * An image rendered as the `src` of an `<img>`.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/core-image--round-corners}
 */
export default Object.assign(DefaultImage, { Base: DefaultImageBase });
