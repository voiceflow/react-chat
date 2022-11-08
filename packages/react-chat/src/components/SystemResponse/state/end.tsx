import { useContext, useEffect } from 'react';

import { SessionStatus } from '@/common';
import { RuntimeAPIContext } from '@/contexts';

const EndState: React.FC = () => {
  const runtime = useContext(RuntimeAPIContext);

  useEffect(() => {
    runtime.setStatus(SessionStatus.ENDED);
  }, []);

  return null;
};

export default EndState;
