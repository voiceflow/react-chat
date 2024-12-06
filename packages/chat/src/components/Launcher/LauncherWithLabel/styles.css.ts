import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { duration, timingFunction } from '@/styles/animations';
import { PALETTE } from '@/styles/colors.css';
import { FAMILY } from '@/styles/font';
import { transition } from '@/styles/transitions';

const LAUNCHER_WITH_LABEL_SIZE = 40;
const BEZIER = 'cubic-bezier(0.4, 0, 0.2, 1)';

export const launcherStyles = recipe({
  base: {
    borderRadius: '9999px',
    transition: `all ${duration.default} ${BEZIER}`,
    transformOrigin: 'right',
    willChange: 'max-width, transform',
    height: LAUNCHER_WITH_LABEL_SIZE,
    overflow: 'hidden',
    display: 'flex',

    boxShadow:
      '0px 1px 0px 0px rgba(22, 26, 30, 0.02), 0px 0px 0px 1px rgba(22, 26, 30, 0.04), 0px 1px 5px -4px rgba(22, 26, 30, 0.08), 0px 4px 8px -6px rgba(22, 26, 30, 0.08), 0px 1px 3px 1px rgba(22, 26, 30, 0.01)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PALETTE.colors[500],
  },
  variants: {
    isOpen: {
      true: {
        maxWidth: LAUNCHER_WITH_LABEL_SIZE, // Collapsed state
        filter: 'drop-shadow(rgba(0, 0, 0, 0.06) 0px 1px 6px) drop-shadow(rgba(0, 0, 0, 0.16) 0px 2px 32px)',
      },
      false: {
        maxWidth: '500px', // Expanded state
      },
    },
  },
});

export const launcherLabelStyles = recipe({
  base: {
    fontFamily: FAMILY,
    fontSize: '14px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    display: 'flex',
    minWidth: 0, // Critical for ellipsis to work correctly
    maxWidth: '100%',
    alignItems: 'center',
  },
  variants: {
    isOpen: {
      true: {
        // Optional: Add animations for opening
      },
      false: {
        // Optional: Add animations for closing
      },
    },
  },
});

// Usage
// In your component, apply the `launcherStyles` and `launcherLabelStyles` conditionally based on `isOpen` state.
// For example:
// <div className={launcherStyles({ isOpen })}>...</div>
// <span className={launcherLabelStyles({ isOpen })}>Label</span>

// export const launcherContainer = style({
//   width: 'fit-content',
// });

// export const launcherStyles = recipe({
//   base: {

//     height: LAUNCHER_WITH_LABEL_SIZE,

//     padding: '8px 16px 8px 12px',
//     // animation: `${scaleIn} 0.3s ease-in-out`,
//     transformOrigin: 'right', // Ensure the animation starts from the right

//     willChange: 'transform',
//   },

//   variants: {
//     isOpen: {
//       true: {
//         filter: 'drop-shadow(rgba(0, 0, 0, 0.06) 0px 1px 6px) drop-shadow(rgba(0, 0, 0, 0.16) 0px 2px 32px)',
//         width: LAUNCHER_WITH_LABEL_SIZE,
//       },
//       false: {
//         width: '100%',
//       },
//     },
//   },
// });

// // ':hover': {
// //   transform: 'scale(1.1)',
// //   backgroundColor: PALETTE.colors[600],
// // },
// // ':active': {
// //   transform: 'scale(0.8)',
// //   backgroundColor: PALETTE.colors[700],
// // },

// // '::before': {
// //   content: '""',
// //   top: '-4px',
// //   position: 'absolute',
// //   bottom: '-4px',
// //   left: '-4px',
// //   right: '-4px',
// //   borderRadius: 'inherit',
// //   backgroundColor: 'transparent',
// //   zIndex: -1,
// // },

// export const launcherLabelStyles = recipe({
//   base: {
//     fontSize: '14px',
//     fontWeight: 600,
//     color: PALETTE.colors[50],
//     lineHeight: '20px',
//     marginLeft: '6px',
//     textAlign: 'right',
//     minWidth: 0,
//     paddingTop: 1,
//     opacity: 1,
//     overflow: 'hidden',
//     whiteSpace: 'nowrap',
//     textOverflow: 'ellipsis',
//     transition: 'opacity 50ms, max-width 100ms, width 100ms, margin-left 300ms',
//   },
//   variants: {
//     isOpen: {
//       true: {
//         opacity: 0,
//         width: 0,
//         // marginLeft: 0,
//       },
//       false: {
//         opacity: 1,
//         width: '100%',
//         marginLeft: '6px',
//       },
//     },
//   },
// });

export const iconContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '24px',
    height: '24px',
  },
});

export const launcherIconStyles = recipe({
  base: {
    color: PALETTE.colors[50],
    width: 24,
    height: 24,
    borderRadius: 2,
    flexShrink: 0,
  },
});

export const playIconStyles = recipe({
  base: {
    width: 32,
    height: 32,
    borderRadius: 2,
    position: 'absolute',
    flexShrink: 0,
    transition: transition(['opacity', 'width']),
  },
  variants: {
    isOpen: {
      true: {
        opacity: 0,
      },
      false: {
        opacity: 1,
      },
    },
  },
});
export const twistInAnimation = keyframes({
  '0%': {
    opacity: 0,
    transform: 'rotate(-45deg)',
  },
  '100%': {
    opacity: 1,
    transform: 'rotate(0deg)',
  },
});

export const twistOutAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    opacity: 0,
    transform: 'rotate(-45deg)',
  },
});

export const closeChevron = recipe({
  base: {
    transform: 'rotate(0deg)',
    transition: transition(['width']),
    position: 'absolute',
    width: '32px',
    opacity: 0,
  },
  variants: {
    isOpen: {
      true: {
        animation: `${twistInAnimation} 0.2s ease-in-out`,
        opacity: 1,
      },
      false: {
        animation: `${twistOutAnimation} 0.2s ease-in-out`,
        opacity: 0,
        pointerEvents: 'none',
      },
    },
  },
});

export const imageStyles = recipe({
  base: {
    transition: transition(['opacity', 'width']),
    height: '24px',
    position: 'absolute',
    width: '24px',
  },
  variants: {
    isOpen: {
      true: {
        opacity: 0,
      },
      false: {
        opacity: 1,
      },
    },
  },
});
