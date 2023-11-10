import { useContext, useEffect } from 'react';

import { SessionStatus } from '@/common';
import { RuntimeContext } from '@/contexts';

const EndState: React.FC = () => {
  const runtime = useContext(RuntimeContext);

  useEffect(() => {
    runtime.setStatus(SessionStatus.ENDED);
  }, []);

  return null;
};

export default EndState;
