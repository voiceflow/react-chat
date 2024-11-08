import clsx from 'clsx';

import { arrowDown } from '@/assets/svg';

import { scrollButton, scrollIcon } from './ScrollButton.css';

export const ScrollButton = ({ onClick, className }: { onClick?: () => void; className?: string }) => {
  return (
    <button className={clsx(scrollButton, className)} onClick={onClick}>
      <div className={scrollIcon}>{arrowDown({ title: 'scroll' })}</div>
    </button>
  );
};
