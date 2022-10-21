import { BaseImage } from './styled';

export interface ImageProps extends React.ComponentProps<typeof BaseImage> {
  image: string | null;
}

const Image: React.FC<ImageProps> = ({ image, ...props }) =>
  image ? <BaseImage {...props} css={{ backgroundImage: `url('${image}')`, ...props.css }} /> : null;

export default Object.assign(Image, {
  Base: BaseImage,
});
