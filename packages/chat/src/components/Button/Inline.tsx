import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { forwardRef, useContext } from 'react';

import { ClassName } from '@/constants';
import { RuntimeStateAPIContext } from '@/contexts';
import { createColorPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';

import { buttonStyles } from './styles.css';

const InlineButton = forwardRef<HTMLButtonElement, PropsWithChildren<any>>(({ children, ...props }, ref) => {
  const { assistant } = useContext(RuntimeStateAPIContext);

  return (
    <button
      ref={ref}
      style={assignInlineVars(PALETTE, { colors: createColorPalette(assistant.color) })}
      className={clsx(ClassName.BUTTON, buttonStyles({ type: 'inline' }))}
      {...props}
    >
      {assistant.color}
      {children}
    </button>
  );
});

export default InlineButton;
