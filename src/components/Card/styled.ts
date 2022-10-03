import Button from '@/components/Button';
import Image from '@/components/Image';
import { styled } from '@/styles';

export const CARD_WIDTH = 246;

export const Container = styled('section', {
  display: 'inline-flex',
  flexDirection: 'column',
  width: CARD_WIDTH,
  border: '1px solid #f1f1f1',
  borderRadius: '$2',
  boxSizing: 'content-box',
  overflow: 'hidden',
  backgroundColor: '$lightGrey',

  [`& ${Image.Base}`]: {
    height: 150,
  },

  [`& ${Button.Container}`]: {
    width: '100%',
    color: '$primary',
    backgroundColor: '$white',
    boxShadow: '0 5px 8px -8px $shadow12, 0 2px 4px -3px $shadow12, 0 0 0 1px $shadow3, 0 1px 3px 1px $shadow1',
    marginBottom: '$2',
    trans: ['color', 'box-shadow'],

    '&:hover': {
      color: '$darkPrimary',
      backgroundColor: '$white',
      boxShadow: '0 5px 8px -8px $shadow12, 0 2px 4px -3px $shadow12, 0 0 0 1px $shadow4, 0 1px 4px 1px $shadow4',
    },

    '&:first-of-type': {
      marginTop: '$3',
    },

    '&:last-of-type': {
      marginBottom: 0,
    },
  },
});

export const Content = styled('main', {
  padding: '$3',
});

export const Header = styled('h3', {
  margin: '0 0 $1 0',
  typo: { weight: '$2' },
  color: '$black',
});

export const Description = styled('p', {
  margin: 0,
  typo: { size: '$1' },
  color: '$darkGrey',
  whiteSpace: 'normal',
});
