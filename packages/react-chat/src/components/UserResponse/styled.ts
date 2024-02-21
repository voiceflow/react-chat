import Timestamp from '@/components/Timestamp';
import Tooltip from '@/components/Tooltip';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

import Message from '../Message';

const tag = tagFactory(ClassName.USER_RESPONSE);

export const Debug = styled(tag('aside', 'debug'), {
  typo: { size: '12px', height: '17px' },
  color: '$darkGrey',
  marginTop: '$2',
});

export const Container = styled(tag('div'), {
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  alignItems: 'flex-end',

  [`& ${Message.Container}`]: {
    maxWidth: 282,
  },

  [`& > ${Tooltip.Container}`]: {
    marginTop: '$1',
  },
});

export const Row = styled(tag('div', 'row'), {
  display: 'flex',
  width: '100%',
  alignItems: 'center',

  [`& ${Timestamp.Container}`]: {
    flexGrow: 1,
    marginRight: 8,
    textAlign: 'end',
    opacity: '0%',
    trans: ['opacity'],
  },

  [`&:hover ${Timestamp.Container}`]: {
    opacity: '100%',
  },
});
