import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { type ComponentPropsWithRef, forwardRef, type PropsWithChildren } from 'react';

import { ClassName } from '@/constants';
import { createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import type { IThemedComponent } from '@/types';

import { ButtonVariant } from './constants';
import { buttonStyles } from './styles.css';

interface ButtonProps extends IThemedComponent, ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  round?: boolean;
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(({ children, ...props }, ref) => {
  const { variant: type, round } = props;

  return (
    <button
      ref={ref}
      style={assignInlineVars(PALETTE, { colors: createPalette(props.primaryColor) })}
      className={clsx(ClassName.BUTTON, buttonStyles({ type: type ?? ButtonVariant.PRIMARY, round }))}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
