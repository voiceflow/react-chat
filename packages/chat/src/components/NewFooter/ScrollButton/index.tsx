import { arrowDown } from '@/assets/svg';

import { scrollButton, scrollIcon } from './ScrollButton.css';

export const ScrollButton = () => {
  return (
    <button className={scrollButton}>
      <div className={scrollIcon}>{arrowDown({ title: 'scroll' })}</div>
    </button>
  );
};
