import Avatar from '@/components/Avatar';
import Icon from '@/components/Icon';
import { styled } from '@/styles';

export const Title = styled('h1', {
  typo: { size: 17, weight: '$2', height: '$2' },
  color: 'rgba(255,255,255,0.95)',
});

export const Button = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 32,
  width: 32,
  marginLeft: 8,
  border: 0,
  borderRadius: 6,
  padding: 0,
  background: 'none',
  trans: ['background-color'],

  '&:focus': {
    outline: 0,
  },

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'rgba(255,255,255,0.16)',

    [`& ${Icon.Frame}`]: {
      color: '$white',
    },
  },

  [`& ${Icon.Frame}`]: {
    height: '$xxs',
    width: '$xxs',
    color: 'rgba(255,255,255,0.8)',
    trans: ['color'],
  },
});

export const Container = styled('header', {
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  height: '$lg',
  padding: '0 $4 0 $5',
  backgroundColor: '$primary',
  boxShadow: '0 1px 2px $shadow16',

  [`& ${Avatar.Container}`]: {
    height: 32,
    width: 32,
  },

  [`& ${Title}`]: {
    flex: 1,
    marginLeft: 14,
  },
});
