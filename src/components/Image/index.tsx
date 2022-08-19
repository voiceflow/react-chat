import { BaseImage } from './styled';

export interface ImageProps extends React.ComponentProps<typeof BaseImage> {
  image: string;
}

const Image: React.FC<ImageProps> = ({ image, ...props }) => <BaseImage {...props} css={{ backgroundImage: `url('${image}')`, ...props.css }} />;

export default Object.assign(Image, {
  Base: BaseImage,
});
