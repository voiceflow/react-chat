import { styled } from '@/styles';

export const BackgroundImageBase = styled('div', {
  height: 200,
  width: 248,
  backgroundColor: '$lightGrey',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

export interface BackgroundImageProps extends React.ComponentProps<typeof BackgroundImageBase> {
  image: string | null;
}

// this is a <div> with a background image
const BackgroundImage: React.FC<BackgroundImageProps> = ({ image, ...props }) =>
  image ? <BackgroundImageBase {...props} css={{ backgroundImage: `url('${image}')`, ...props.css }} /> : null;

export default Object.assign(BackgroundImage, { Base: BackgroundImage });
