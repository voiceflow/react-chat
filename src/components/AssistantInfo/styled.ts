import Avatar from '@/components/Avatar';
import { styled } from '@/styles';

export const Title = styled('h2', {
  margin: 0,
  typo: { size: 20, weight: '$2', height: '$2' },
  color: '$black',
});

export const Description = styled('p', {
  margin: 0,
  typo: {},
  color: '$darkGrey',
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
