import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

const tag = tagFactory(ClassName.AGENT_CARD);

export const AgentButton = styled(tag('button'), {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  borderRadius: '6px',
  backgroundColor: '$white',
  padding: '$4',
  textAlign: 'left',
  trans: ['background-color'],
  border: 'none',
  cursor: 'pointer',
  width: '100%',

  '&:hover': {
    backgroundColor: '$lightGrey',
  },

  '&:focus': {
    outline: 'none',
  },
});

export const ContentContainer = styled(tag('div', 'content'), {
  display: 'flex',
  flexDirection: 'column',
});

export const AgentName = styled(tag('span', 'name'), {
  fontSize: '14px',
  fontWeight: 500,
  color: '$black',
});

export const AgentTimestamp = styled(tag('span', 'timestamp'), {
  fontSize: '12px',
  color: '$darkGrey',
});
