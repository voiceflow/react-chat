import Avatar from '@/components/Avatar';
import { styled } from '@/styles';
import { textOverflowStyles } from '@/styles/fragments';

export const Title = styled('h2', {
  ...textOverflowStyles,
  width: '100%',
  margin: 0,
  typo: { size: 20, weight: '$2', height: '$2' },
  color: '$black',
});

export const Description = styled('p', {
  display: '-webkit-box',
  margin: 0,
  typo: {},
  color: '$darkGrey',
  '-webkit-line-clamp': 2,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  wordBreak: 'break-word',
});

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '48px 32px',
  textAlign: 'center',

  [`& ${Avatar.Container}`]: {
    marginBottom: '$4',
  },

  [`& ${Title}`]: {
    marginBottom: 8,
  },
});
