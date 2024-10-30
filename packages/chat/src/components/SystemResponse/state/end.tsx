import { useContext, useEffect } from 'react';

import { RuntimeStateAPIContext } from '@/contexts';
import { SessionStatus } from '@/types';

const EndState: React.FC = () => {
  const runtime = useContext(RuntimeStateAPIContext);

  useEffect(() => {
    runtime.setStatus(SessionStatus.ENDED);
  }, []);

  return null;
};

export default EndState;
