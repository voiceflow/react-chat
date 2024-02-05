import { ClassName } from '@/constants';
import { useStitches } from '@/contexts';
import { tagFactory } from '@/hocs';
import { rotate } from '@/styles';

const SIZE = 32;
const ANIMATION_DURATION = 1000;

const tag = tagFactory(ClassName.LOADER);

const Loader = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div'), {
    height: SIZE,
    width: SIZE,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '$round',
    borderColor: '#f0f0f0',
    borderTopColor: '#000',
    animation: `${rotate} ${ANIMATION_DURATION}ms linear`,
    animationIterationCount: 'infinite',
  });
  return <Styled {...props} />;
};

/**
 * An infinite loading spinner.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/core-loader--default}
 */
export default Loader;
