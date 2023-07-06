import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { pulse, styled } from '@/styles';

export const ANIMATION_DURATION = 1000;

const tag = tagFactory(ClassName.TYPING_INDICATOR);

export const Container = styled(tag('span'), {
  display: 'inline-flex',
});

export const Dot = styled(tag('span', 'dot'), {
  height: 8,
  width: 8,
  margin: '0 2px',
  borderRadius: '$round',
  backgroundColor: '#adadb3',
  opacity: 0.2,
  animation: `${pulse} ${ANIMATION_DURATION}ms`,
  animationIterationCount: 'infinite',
});
