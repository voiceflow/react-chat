import Icon from '../Icon';
import { AutoInputButtonContainer } from './styled';

interface AudioInputButtonProps {
  onStop: () => void;
  onStart: () => void;
  listening: boolean;
}

export const AudioInputButton: React.FC<AudioInputButtonProps> = ({ onStop, onStart, listening }) => {
  return (
    <AutoInputButtonContainer onClick={listening ? onStop : onStart} listening={listening}>
      <Icon svg={listening ? 'stop' : 'microphone'} />
    </AutoInputButtonContainer>
  );
};
