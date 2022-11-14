import { BackgroundImage, DefaultImage } from './styled';

export interface ImageProps extends React.ComponentProps<typeof DefaultImage> {
  image: string | null;
}

// this is a pure HTML <img> tag
const ImageHOC: React.FC<ImageProps> = ({ image, ...props }) => <DefaultImage {...props} src={image || undefined} />;

// this is a <div> with a background image
const BackgroundHOC: React.FC<ImageProps> = ({ image, ...props }) =>
  image ? <BackgroundImage {...props} css={{ backgroundImage: `url('${image}')`, ...props.css }} /> : null;

const Background = Object.assign(BackgroundHOC, {
  Base: BackgroundImage,
});

export default Object.assign(ImageHOC, {
  Base: DefaultImage,
  Background,
});
