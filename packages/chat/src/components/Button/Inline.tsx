import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import { ClassName } from '@/constants';

import { buttonStyles } from './styles.css';

const InlineButton = forwardRef<HTMLButtonElement, PropsWithChildren<any>>(({ ref, children, ...props }) => (
  <button ref={ref} className={clsx(ClassName.BUTTON, buttonStyles({ type: 'inline' }))} {...props}>
    {children}
  </button>
));

export default InlineButton;
