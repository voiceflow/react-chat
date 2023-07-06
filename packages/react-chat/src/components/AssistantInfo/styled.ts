import Avatar from '@/components/Avatar';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';
import { textOverflowStyles } from '@/styles/fragments';

const tag = tagFactory(ClassName.ASSISTANT_INFO);

export const Title = styled(tag('h2', 'title'), {
  ...textOverflowStyles,
  width: '100%',
  margin: 0,
  typo: { size: 20, weight: '$2', height: '$3' },
  color: '$black',
});

export const Description = styled(tag('p', 'description'), {
  display: '-webkit-box',
  margin: 0,
  typo: {},
  color: '$darkGrey',
  '-webkit-line-clamp': 2,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  wordBreak: 'break-word',
});

export const Container = styled(tag('div'), {
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
