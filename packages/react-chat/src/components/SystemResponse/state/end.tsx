import { useContext, useEffect } from 'react';

import { SessionStatus } from '@/common';
import { RuntimeStateAPIContext } from '@/contexts';

const EndState: React.FC = () => {
  const runtime = useContext(RuntimeStateAPIContext);

  useEffect(() => {
    runtime.setStatus(SessionStatus.ENDED);
  }, []);

  return null;
};

export default EndState;
