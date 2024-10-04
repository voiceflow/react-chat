import Message from '@/components/OldMessage';
import Timestamp from '@/components/Timestamp';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/old-styles';

import { avatarStyles } from '../Avatar/styles.css';
import { buttonStyles } from '../Button/styles.css';

const tag = tagFactory(ClassName.SYSTEM_RESPONSE);

export const Actions = styled(tag('div', 'actions'), {
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: 8,
  padding: '0 $5 0 54px',

  [`& .${buttonStyles.classNames.base}`]: {
    height: 'unset',
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: 8,
    marginRight: 8,
    whiteSpace: 'normal',
    textAlign: 'start',
  },
});

export const Controls = styled(tag('span', 'controls'), {
  position: 'relative',
});

export const Container = styled(tag('div'), {
  display: 'flex',

  [`& .${avatarStyles.classNames.base}`]: {
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
        [`& .${avatarStyles.classNames.base}`]: {
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

        '&::-webkit-scrollbar': {
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

export const MessageContainer = styled(tag(Container, 'message'));

export const IndicatorContainer = styled(tag(Container, 'indicator'));

export const List = styled(tag('div', 'list'), {
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  flex: 'inherit',

  [`& ${Message.Container}`]: {
    marginBottom: '$1',

    '&:last-of-type': {
      marginBottom: 0,
    },
  },
});
