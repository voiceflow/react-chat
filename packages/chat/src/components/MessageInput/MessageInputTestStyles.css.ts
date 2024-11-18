import { recipe } from '@vanilla-extract/recipes';

export const chatContainer = recipe({
  base: {
    maxHeight: 400,
    pointerEvents: 'auto',
    opacity: 0,
    width: 0,
    transition: 'opacity 300ms cubic-bezier(0.85, 0, 0.6, 1), width 300ms cubic-bezier(0.85, 0, 0.6, 1)',
    transformOrigin: 'right center', // Set transform origin to right
    position: 'absolute',
  },
  variants: {
    isOpen: {
      true: {
        opacity: 1,
        pointerEvents: 'auto',
        width: 400, // Grow width without affecting inner content
      },
      false: {
        opacity: 0,
        pointerEvents: 'none',
        width: 0,
      },
    },
  },
});
