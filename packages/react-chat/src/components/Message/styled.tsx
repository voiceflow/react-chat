import { ClassName } from '@/constants';
import { useStitches } from '@/contexts';
import { tagFactory } from '@/hocs';

export const tag = tagFactory(ClassName.MESSAGE);

export const Container = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div'), {
    display: 'inline-block',
    boxSizing: 'border-box',
    padding: '10px 14px',
    borderRadius: '$1',
    typo: {},
    overflowWrap: 'anywhere',
  });
  return <Styled {...props} />;
};
