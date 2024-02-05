import Avatar from '@/components/Avatar';
import { ClassName } from '@/constants';
import { useStitches } from '@/contexts';
import { tagFactory } from '@/hocs';
import { textOverflowStyles } from '@/styles/fragments';

const tag = tagFactory(ClassName.ASSISTANT_INFO);

export const Title = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('h2', 'title'), {
    ...textOverflowStyles,
    width: '100%',
    margin: 0,
    typo: { size: 20, weight: '$2', height: '$3' },
    color: '$black',
  });
  return <Styled {...props} />;
};

export const Description = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('p', 'description'), {
    display: '-webkit-box',
    margin: 0,
    typo: {},
    color: '$darkGrey',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    wordBreak: 'break-word',
  });
  return <Styled {...props} />;
};

export const Container = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div'), {
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
  return <Styled {...props} />;
};
