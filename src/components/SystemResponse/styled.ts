import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Message from '@/components/Message';
import Timestamp from '@/components/Timestamp';
import { styled } from '@/styles';

export const Actions = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '$5',
  padding: '0 $5 0 34px',

  [`& ${Button.Base}`]: {
    height: 'unset',
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: 8,
    marginRight: 8,
    whiteSpace: 'normal',
    textAlign: 'start',
  },
});

export const Container = styled('div', {
  display: 'flex',

  [`& ${Avatar.Container}`]: {
    visibility: 'hidden',
    alignSelf: 'flex-end',
    margin: '0 8px 4px 0',
  },

  [`& ${Timestamp.Container}`]: {
    alignSelf: 'center',
    whiteSpace: 'nowrap',
    marginLeft: 8,
    opacity: '0%',
    trans: ['opacity'],
  },

  [`&:hover ${Timestamp.Container}`]: {
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
  flexShrink: 0,

  [`& ${Message.Container}`]: {
    marginBottom: '$1',
    maxWidth: 248,

    '&:last-of-type': {
      marginBottom: 0,
    },
  },
});
