import clsx from 'clsx';

import { topCaret as TopCaret } from '@/assets/svg';

import { debugContainerStyles } from './styled.css';

export interface DebugMessageProps extends React.PropsWithChildren {
  /**
   * The end of the message where the arrow is rendered.
   *
   * @default 'left'
   */
  orientation?: 'left' | 'right';
}

const DebugMessage: React.FC<DebugMessageProps> = ({ children, orientation = 'left' }) => {
  return (
    <div className={clsx(debugContainerStyles())}>
      <TopCaret />
      {children}
    </div>
  );
};

export default Object.assign(DebugMessage, {
  debugContainerStyles,
});
