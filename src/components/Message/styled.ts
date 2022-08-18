import { styled } from '@/styles';

export const Container = styled('div', {
  display: 'inline-block',
  padding: '10px 14px',
  borderRadius: '$1',
  fontFamily: '$default',
  fontSize: '$2',
  fontWeight: '$1',
  lineHeight: '$1',

  variants: {
    from: {
      system: {
        color: '$black',
        backgroundColor: '$lightGrey',
      },

      user: {
        color: '$white',
        backgroundColor: '$primary',
      },
    },
  },
  defaultVariants: {
    from: 'system',
  },
});
