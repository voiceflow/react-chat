import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';
import { SIZES } from '@/styles/sizes';
import { transition } from '@/styles/transitions';

import { messageContainer } from '../MessageContainer/styles.css';
import { systemMessageContainer } from '../SystemResponse/styles.css';

export const agentMessageContainer = style({
  backgroundColor: COLORS.NEUTRAL_LIGHT[50],
  color: COLORS.NEUTRAL_DARK[900],
  fontFamily: FAMILY,
  position: 'relative',
  fontSize: '14px',
  lineHeight: '20px',
  borderRadius: SIZES.radius.sm,
  width: 'fit-content',
});

export const contentStyle = recipe({
  base: {
    whiteSpace: 'normal',
  },
  variants: {
    isCodeBlock: {
      true: {
        padding: 0,
      },
      false: {
        padding: '11px 16px 10px',
      },
    },
  },
});

export const embeddedContent = style({
  padding: '0 16px 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const generatedChin = style({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px 9px',
  backgroundColor: COLORS.NEUTRAL_LIGHT[100],
  left: 0,
  right: 0,
  bottom: 0,
  color: COLORS.NEUTRAL_DARK[200],
  fontFamily: FAMILY,
  fontSize: '12px',
  whiteSpace: 'nowrap',
  lineHeight: '17px',
  gap: '10px',
  fontWeight: 600,
  borderRadius: '0 0 10px 10px',
});

export const aiIconModifier = style({
  color: COLORS.NEUTRAL_DARK[100],
  height: '16px',
});

export const codeBlockContainer = style({
  position: 'relative',
});

export const copyButton = style({
  position: 'absolute',
  right: '12px',
  top: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: transition(['opacity', 'background-color', 'color']),
  zIndex: 2,
  opacity: 0,
  selectors: {
    [`${codeBlockContainer}:hover &`]: {
      opacity: 1,
    },
    '&:hover': {
      backgroundColor: COLORS.NEUTRAL_DARK[200],
      color: COLORS.NEUTRAL_LIGHT[50],
    },
    '&:active': {},
  },
});

export const feedbackButtonContainer = style({
  opacity: 0,
  position: 'absolute',
  right: '-6px',
  bottom: '-14px',
  transition: transition(['opacity']),
  selectors: {
    [`${systemMessageContainer}:hover &`]: {
      opacity: 1,
    },
    [`${messageContainer()}:hover &`]: {
      opacity: 1,
    },
  },
});

export const lastListItem = style({
  marginBottom: 0,
});

export const lastPElement = style({
  ':last-child': {
    marginBottom: 0,
  },
});

export const markdownParagraph = recipe({
  base: {
    marginBottom: '8px',
    marginTop: '8px',
  },
  variants: {
    first: {
      true: {
        marginTop: 0,
      },
    },
  },
});
