import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

const tag = tagFactory(ClassName.AVATAR);

export const AvatarContainer = styled(tag('div'), {
  flexShrink: 0,
  borderRadius: '$round',
  backgroundColor: '$lightGrey',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',

  variants: {
    size: {
      small: {
        height: 26,
        width: 26,
      },

      large: {
        height: '$xxl',
        width: '$xxl',
        boxSizing: 'border-box',
        boxShadow: '0 4px 16px 0 $shadow4, 0 0 0 1px $shadow2',
      },
    },
  },
  defaultVariants: {
    size: 'small',
  },
});
