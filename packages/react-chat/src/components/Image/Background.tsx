import { useStitches } from '@/contexts';

import { tag } from './Default';

export const BackgroundImageBase = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div', 'background'), {
    height: 200,
    width: 248,
    backgroundColor: '$lightGrey',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  });
  return <Styled {...props} />;
};

export interface BackgroundImageProps extends React.ComponentProps<typeof BackgroundImageBase> {
  /**
   * A URL for the image to render.
   */
  image: string | null;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ image, ...props }) =>
  image ? <BackgroundImageBase {...props} css={{ backgroundImage: `url('${image}')`, ...props.css }} /> : null;

/**
 * An image rendered as the `background-image` of a `<div>`.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/core-image-background--default}
 */
export default Object.assign(BackgroundImage, { Base: BackgroundImageBase });
