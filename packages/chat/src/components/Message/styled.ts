import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

export const tag = tagFactory(ClassName.MESSAGE);

export const Container = styled(tag('div'), {
  display: 'inline-block',
  boxSizing: 'border-box',
  padding: '10px 14px',
  borderRadius: '$1',
  typo: {},
  overflowWrap: 'anywhere',
});
