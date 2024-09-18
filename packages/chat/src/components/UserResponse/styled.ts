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

  [`& > ${Tooltip.Container}`]: {
    marginTop: '$1',
  },
  variants: {
    mode: {
      overlay: {
        [`& ${Message.Container}`]: {
          maxWidth: '248px',
        },
      },
      embedded: {
        [`& ${Message.Container}`]: {
          maxWidth: '80%',
        },
      },
    },
  },

  defaultVariants: {
    mode: 'overlay',
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
