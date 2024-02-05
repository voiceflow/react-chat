import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Message from '@/components/Message';
import Timestamp from '@/components/Timestamp';
import { ClassName } from '@/constants';
import { useStitches } from '@/contexts';
import { tagFactory } from '@/hocs';

const tag = tagFactory(ClassName.SYSTEM_RESPONSE);

export const Actions = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div', 'actions'), {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 8,
    padding: '0 $5 0 54px',

    [`& ${Button.Container}`]: {
      height: 'unset',
      paddingTop: 7,
      paddingBottom: 7,
      marginTop: 8,
      marginRight: 8,
      whiteSpace: 'normal',
      textAlign: 'start',
    },
  });
  return <Styled {...props} />;
};

export const Controls = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('span', 'controls'), {
    position: 'relative',
  });
  return <Styled {...props} />;
};

export const Container = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div'), {
    display: 'flex',

    [`& ${Avatar.Container}`]: {
      visibility: 'hidden',
      alignSelf: 'flex-end',
      margin: '0 8px 4px 0',
    },

    [`& ${Timestamp.Container}`]: {
      alignSelf: 'center',
      whiteSpace: 'nowrap',
      marginLeft: 8,
      opacity: '0%',
      trans: ['opacity'],
    },

    [`&:hover ${Timestamp.Container}`]: {
      opacity: '100%',
    },

    variants: {
      withImage: {
        true: {
          [`& ${Avatar.Container}`]: {
            visibility: 'visible',
          },
        },
      },
      scrollable: {
        true: {
          overflowX: 'scroll',
          flexShrink: 0,
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',

          [`&::-webkit-scrollbar`]: {
            display: 'none',
          },
        },
      },
      center: {
        true: {
          alignItems: 'center',
        },
      },
    },
  });
  return <Styled {...props} />;
};

export const MessageContainer = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag(Container, 'message'));
  return <Styled {...props} />;
};

export const IndicatorContainer = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag(Container, 'indicator'));
  return <Styled {...props} />;
};

export const List = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div', 'list'), {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,

    [`& ${Message.Container}`]: {
      marginBottom: '$1',
      maxWidth: 248,

      '&:last-of-type': {
        marginBottom: 0,
      },
    },
  });
  return <Styled {...props} />;
};
