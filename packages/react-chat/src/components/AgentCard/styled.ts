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
  boxShadow: `
    0px 1px 3px 1px #161A1E03,
    0px 4px 8px -6px #161A1E14,
    0px 1px 5px -4px #161A1E14,
    0px 0px 0px 1px #161A1E0A,
    0px 1px 0px 0px #161A1E05
  `,

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
  margin: 0,
  padding: 0,
});

export const AgentTimestamp = styled(tag('span', 'timestamp'), {
  fontSize: '12px',
  color: '$darkGrey',
  margin: 0,
  padding: 0,
});
