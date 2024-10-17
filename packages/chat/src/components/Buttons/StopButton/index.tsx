import { stop } from '@/assets/svg';

import { icon, stopButton } from './StopButton.css';

interface IStopButton {
  onClick: () => void;
}

export const StopButton: React.FC<IStopButton> = ({ onClick }) => {
  return (
    <button className={stopButton} onClick={onClick}>
      <span className={icon}>{stop({ title: 'stop' })}</span>
    </button>
  );
};
