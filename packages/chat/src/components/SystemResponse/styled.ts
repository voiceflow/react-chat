import Message from '@/components/Message';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/old-styles';

import { avatarStyles } from '../Avatar/styles.css';

const tag = tagFactory(ClassName.SYSTEM_RESPONSE);

export const Container = styled(tag('div'), {
  display: 'flex',

  [`& .${avatarStyles.classNames.base}`]: {
    visibility: 'hidden',
    alignSelf: 'flex-end',
    margin: '0 8px 4px 0',
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
