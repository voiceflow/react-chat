import Button from '@/components/Button';
import Input from '@/components/Input';
import { styled } from '@/styles';

export const Container = styled('footer', {
  padding: '$3 $4 0 $4',

  [`& ${Input.Container}`]: {
    flex: 1,
  },

  [`& ${Button.Base}`]: {
    width: '100%',
  },
});

export const Watermark = styled('aside', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 0 $3 0',
  typo: { size: 12, height: '17px' },
  color: '$darkGrey',

  '& a': {
    marginLeft: '0.5ch',
    textDecoration: 'none',
    color: '$primary',

    '&:focus': {
      outline: 0,
    },
  },
});
