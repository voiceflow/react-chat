import Avatar from '@/components/Avatar';
import BaseButton from '@/components/Button';
import Icon from '@/components/Icon';
import { styled } from '@/styles';
import { textOverflowStyles } from '@/styles/fragments';

export const Title = styled('h1', {
  ...textOverflowStyles,
  typo: { size: 17, weight: '$2', height: '$2' },
  color: 'rgba(255,255,255,0.95)',
});

export const Button = styled(BaseButton.Reset, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 32,
  width: 32,
  marginLeft: 8,
  borderRadius: 6,
  background: 'none',
  trans: ['background-color'],

  '&:hover': {
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
    margin: '0 0 0 14px',
  },
});
