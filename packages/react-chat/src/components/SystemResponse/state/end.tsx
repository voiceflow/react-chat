import { useEffect } from 'react';

export interface EndStateProps {
  onEnd?: VoidFunction | undefined;
}

const EndState: React.FC<EndStateProps> = ({ onEnd }) => {
  useEffect(() => {
    onEnd?.();
  }, []);

  return null;
};

export default EndState;
