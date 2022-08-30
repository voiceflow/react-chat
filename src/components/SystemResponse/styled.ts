import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Message from '@/components/Message';
import { styled } from '@/styles';

export const Timestamp = styled('span', {
  typo: { size: 12, height: '17px' },
  color: '$darkGrey',
});

export const Actions = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '$5',
  padding: '0 $5 0 34px',

  [`& ${Button.Base}`]: {
    marginTop: 8,
    marginRight: 8,
  },
});

export const Container = styled('div', {
  display: 'flex',

  [`& ${Avatar.Container}`]: {
    visibility: 'hidden',
    alignSelf: 'flex-end',
    margin: '7px 8px 7px 0',
  },

  [`& ${Timestamp}`]: {
    alignSelf: 'center',
    marginLeft: '$3',
    whiteSpace: 'nowrap',
    opacity: '0%',
    trans: ['opacity'],
  },

  [`&:hover ${Timestamp}`]: {
    opacity: '100%',
  },

  variants: {
    withImage: {
      true: {
        [`& ${Avatar.Container}`]: {
          visibility: 'visible',
        },
      },
    },
  },
});

export const List = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  [`& ${Message.Container}`]: {
    marginBottom: '$1',

    '&:last-of-type': {
      marginBottom: 0,
    },
  },
});
