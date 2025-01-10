import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { SIZES } from '@/styles/sizes';

export const SMALL_AVATAR_SIZE = parseInt(SIZES.sm, 10);

export const avatarStyles = recipe({
  base: {
    flexShrink: 0,
    borderRadius: SIZES.radius.round,
    backgroundColor: COLORS.white,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },

  variants: {
    size: {
      small: {
        height: SMALL_AVATAR_SIZE,
        width: SMALL_AVATAR_SIZE,
      },

      large: {
        height: SIZES.xxl,
        width: SIZES.xxl,
        boxSizing: 'border-box',
        boxShadow:
          '0px 0px 0px 1px rgba(22, 26, 30, 0.06), 0px 1px 1px 0px rgba(22, 26, 30, 0.01), 0px 4px 8px -18px rgba(22, 26, 30, 0.04), 0px 8px 12px -18px rgba(22, 26, 30, 0.04), 0px 10px 16px -18px rgba(22, 26, 30, 0.08), 0px 12px 20px -18px rgba(22, 26, 30, 0.08), 0px 16px 28px -18px rgba(22, 26, 30, 0.12), 0px 20px 44px -18px rgba(22, 26, 30, 0.12)',
      },
    },

    withoutBackground: {
      true: {
        backgroundColor: 'transparent',
      },
    },
  },

  defaultVariants: {
    size: 'small',
  },
});
