import { rotate, styled } from '@/styles';

const SIZE = 32;
const ANIMATION_DURATION = 1000;

const Loader = styled('div', {
  height: SIZE,
  width: SIZE,
  borderWidth: '2px',
  borderStyle: 'solid',
  borderRadius: '$round',
  borderColor: '#f0f0f0',
  borderTopColor: '#000',
  animation: `${rotate} ${ANIMATION_DURATION}ms linear infinite`,
});

export default Loader;
