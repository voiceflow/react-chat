import clsx from 'clsx';
import { type ComponentPropsWithRef, forwardRef, type PropsWithChildren } from 'react';

import { ClassName } from '@/constants';

import { ButtonVariant } from './constants';
import { buttonStyles } from './styles.css';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  round?: boolean;
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(({ children, ...props }, ref) => {
  const { variant: type, round } = props;

  return (
    <button
      ref={ref}
      className={clsx(ClassName.BUTTON, buttonStyles({ type: type ?? ButtonVariant.PRIMARY, round }))}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
