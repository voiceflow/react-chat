import clsx from 'clsx';
import React, { type PropsWithChildren } from 'react';

import { messageContainer } from './styles.css';

/**
 * Used to wrap a `SystemResponse` or a `UserResponse` object.
 * A `SystemResponse` can have multiple messages in it.
 */
export const MessageContainer: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return <div className={clsx(messageContainer, className)}>{children}</div>;
};
