import clsx from 'clsx';

import { topCaret as TopCaret } from '@/assets/svg';

import { caretStyles, debugContainerStyles } from './styles.css';

export interface DebugMessageProps extends React.PropsWithChildren {
  /**
   * The end of the message where the arrow is rendered.
   *
   * @default 'left'
   */
  orientation?: 'left' | 'right';
}

export const DebugMessage: React.FC<DebugMessageProps> = ({ children, orientation = 'left' }) => {
  return (
    <div className={clsx(debugContainerStyles)}>
      <TopCaret className={caretStyles({ orientation })} />
      {children}
    </div>
  );
};
