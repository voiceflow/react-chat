import { styled } from '@/styles';

export const DefaultImageBase = styled('img', {
  width: 248,

  variants: {
    rounded: {
      true: {
        borderRadius: '$1',
      },
    },
  },
  defaultVariants: {
    rounded: true,
  },
});

export interface DefaultImageProps extends React.ComponentProps<typeof DefaultImageBase> {
  image: string | null;
}

// this is a pure HTML <img> tag
const DefaultImage: React.FC<DefaultImageProps> = ({ image, ...props }) => <DefaultImageBase {...props} src={image || undefined} />;

export default Object.assign(DefaultImage, { Base: DefaultImageBase });
