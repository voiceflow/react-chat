import { arrowDown } from '@/assets/svg';

import { scrollButton, scrollIcon } from './ScrollButton.css';

export const ScrollButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button className={scrollButton} onClick={onClick}>
      <div className={scrollIcon}>{arrowDown({ title: 'scroll' })}</div>
    </button>
  );
};
