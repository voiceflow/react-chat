import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { SIZES } from '@/styles/sizes';

import { SMALL_AVATAR_SIZE } from '../Avatar/styles.css';

export const MESSAGE_PADDING = 12;

export const hide = style({
  visibility: 'hidden',
});

const fadeInSlideUp = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(5px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const systemMessageContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 4,
    animation: `${fadeInSlideUp} .05s ease-in`,
  },
  variants: {
    first: {
      true: {
        marginTop: 12,
      },
    },
  },
});

export const responseAvatar = style({
  marginBottom: 4,
});

export const messageContainer = style({
  width: `calc(100% - ${MESSAGE_PADDING + SMALL_AVATAR_SIZE}px)`,
  marginLeft: MESSAGE_PADDING,
});

export const actionsContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  margin: '16px 0 8px 0',
  paddingLeft: 44,
});

export const extensionMessageContainer = style({
  display: 'inline-block',
  boxSizing: 'border-box',
  padding: '10px 14px',
  borderRadius: SIZES.radius.sm,
  overflowWrap: 'anywhere',
  color: '#000',
  backgroundColor: '#f4f4f4',
});

export const feedbackContainer = style({
  marginTop: 6,
  position: 'absolute',
});

//  feedback={
//           <FeedbackButton
//             onPositiveClick={() => console.log('positive')}
//             onNegativeClick={() => console.log('negative')}
//             textContent={textContentOfMessage}
//           />
//         }
