import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Message from '@/components/Message';
import { styled } from '@/styles';

export const Spacer = styled('span', {
  flexGrow: 1,
});

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
    margin: '0 8px 4px 0',
  },

  [`& ${Timestamp}`]: {
    alignSelf: 'center',
    // marginLeft: 'auto',
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
    scrollable: {
      true: {
        overflowX: 'scroll',
        flexShrink: 0,
      },
    },
    center: {
      true: {
        alignItems: 'center',
      },
    },
  },
});

export const List = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  [`& ${Message.Container}`]: {
    marginBottom: '$1',
    maxWidth: 248,
    boxSizing: 'border-box',

    '&:last-of-type': {
      marginBottom: 0,
    },
  },
});
