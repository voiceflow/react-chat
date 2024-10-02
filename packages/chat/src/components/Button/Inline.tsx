import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import { ClassName } from '@/constants';
import { createColorPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';

import { buttonStyles } from './styles.css';

interface ButtonProps {
  color: string;
}

const InlineButton = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(({ children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      style={assignInlineVars(PALETTE, { colors: createColorPalette(props.color) })}
      className={clsx(ClassName.BUTTON, buttonStyles({ type: 'inline' }))}
      {...props}
    >
      {children}
    </button>
  );
});

export default InlineButton;
