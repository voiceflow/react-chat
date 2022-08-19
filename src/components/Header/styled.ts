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
  padding: 0,
  background: 'none',

  '&:focus': {
    outline: 0,
  },

  '&:hover': {
    cursor: 'pointer',
  },

  [`& ${Icon.Frame}`]: {
    height: '$xxs',
    width: '$xxs',
    color: 'RGBA(255,255,255,0.8)',
  },
});

export const Container = styled('header', {
  display: 'flex',
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
