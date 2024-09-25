import Icon from '../Icon';
import { AutoInputButtonContainer } from './styled';

interface AudioInputButtonProps {
  onStop: () => void;
  onStart: () => void;
  listening: boolean;
  processing: boolean;
  initializing: boolean;
}

export const AudioInputButton: React.FC<AudioInputButtonProps> = ({
  onStop,
  onStart,
  listening,
  processing,
  initializing,
}) => {
  return (
    <AutoInputButtonContainer
      onClick={listening ? onStop : onStart}
      disabled={processing || initializing}
      listening={listening}
    >
      <Icon svg={listening ? 'stop' : 'microphone'} />
    </AutoInputButtonContainer>
  );
};
