import Button from '@/components/Button';
import Input from '@/components/Input';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

const tag = tagFactory(ClassName.FOOTER);

export const Container = styled(tag('footer'), {
  padding: '$3 $4 $4 $4',
  borderRadius: '$1',

  [`& ${Input.Container}`]: {
    flex: 1,
  },

  [`& ${Button.Container}`]: {
    width: '100%',
  },

  variants: {
    withShadow: {
      true: {
        boxShadow: '0 12px 48px $shadow16',
      },
    },
    withWatermark: {
      true: {
        paddingBottom: '0',
      },
    },
  },
});

export const Watermark = styled(tag('aside', 'watermark'), {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 0 $3 0',
  typo: { size: 12, height: '17px' },
  color: '$darkGrey',

  '& a': {
    marginLeft: '0.5ch',
    textDecoration: 'none',
    color: '$blue',

    '&:focus': {
      outline: 0,
    },
  },
});
