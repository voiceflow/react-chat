import 'dayjs/plugin/relativeTime';

import dayjs from 'dayjs';
import { useMemo } from 'react';

export const useTimestamp = (startTime: Date) => {
  return useMemo(() => {
    const start = dayjs(startTime);
    const now = dayjs();

    switch (true) {
      case now.isSame(start, 'day'):
        return 'Today';
      case now.subtract(1, 'day').isSame(start, 'day'):
        return 'Yesterday';
      default:
        return start.fromNow();
    }
  }, []);
};
