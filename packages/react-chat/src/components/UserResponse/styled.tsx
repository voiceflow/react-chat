import Timestamp from '@/components/Timestamp';
import Tooltip from '@/components/Tooltip';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';

import Message from '../Message';
import { useStitches } from '@/contexts';

const tag = tagFactory(ClassName.USER_RESPONSE);

export const Debug = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('aside', 'debug'), {
    typo: { size: '12px', height: '17px' },
    color: '$darkGrey',
    marginTop: '$2',
  });
  return <Styled {...props} />;
};

export const Container = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div'), {
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
  return <Styled {...props} />;
};

export const Row = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div', 'row'), {
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
  return <Styled {...props} />;
};
