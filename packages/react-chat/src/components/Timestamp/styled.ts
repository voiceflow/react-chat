import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

const tag = tagFactory(ClassName.TIMESTAMP);

const Container = styled(tag('div'), {
  typo: { size: 12, height: '17px' },
  color: '$darkGrey',
  whiteSpace: 'nowrap',
  flexShrink: 0,
});

export default Container;
