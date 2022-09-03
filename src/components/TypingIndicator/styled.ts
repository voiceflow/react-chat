import { pulse, styled } from '@/styles';

export const ANIMATION_DURATION = 1000;

export const Container = styled('span', {
  display: 'inline-flex',
});

export const Dot = styled('span', {
  height: 8,
  width: 8,
  margin: '0 3px',
  borderRadius: '$round',
  backgroundColor: '$darkGrey',
  opacity: 0.2,
  animation: `${pulse} ${ANIMATION_DURATION}ms`,
  animationIterationCount: 'infinite',
});
