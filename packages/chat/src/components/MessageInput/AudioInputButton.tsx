import clsx from 'clsx';

import { squareButtonStyles } from '../Buttons/SquareButton/styles/SquareButton.css';
import * as SquareButtonTheme from '../Buttons/SquareButton/styles/SquareButtonTheme.css';
import { Icon } from '../Icon';
import { audioInputButton } from './MessageInput.css';

interface AudioInputButtonProps {
  onStop?: () => void;
  onStart?: () => void;
  listening?: boolean;
  processing?: boolean;
  initializing?: boolean;
}

export const AudioInputButton: React.FC<AudioInputButtonProps> = ({
  onStop,
  onStart,
  listening,
  processing,
  initializing,
}) => {
  return (
    <button
      className={clsx(
        squareButtonStyles({ size: 'medium', isActive: false }),
        SquareButtonTheme.light,
        audioInputButton()
      )}
      onClick={listening ? onStop : onStart}
      disabled={processing || initializing}
    >
      {listening ? <Icon svg="stop" /> : <Icon svg="microphone" />}
    </button>
  );
};
