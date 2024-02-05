import { ClassName } from '@/constants';
import { useStitches } from '@/contexts';
import { tagFactory } from '@/hocs';

export const tag = tagFactory(ClassName.PROACTIVE_MESSAGE);

export const MessageContainer = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div'), {
    padding: '11px 16px 10px 16px',
    maxWidth: 256,
    color: '#1A1E23',
    boxShadow: '$surfaceZ1Light',
    borderRadius: '$2',
    background: '$white',
    typo: { size: 14 },
  });
  return <Styled {...props} />;
};

export default MessageContainer;
