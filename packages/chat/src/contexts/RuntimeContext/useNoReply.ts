import { BaseRequest } from '@voiceflow/base-types';
import { useCallback, useRef } from 'react';

import { SessionStatus } from '@/types';

import type { RuntimeState } from './useRuntimeState';

export const useNoReply = (api: () => Pick<RuntimeState['api'], 'interact' | 'isStatus'>) => {
  const noReplyTimeout = useRef<NodeJS.Timeout | null>(null);

  const clearNoReplyTimeout = useCallback(() => {
    if (!noReplyTimeout.current) return;

    clearTimeout(noReplyTimeout.current);
    noReplyTimeout.current = null;
  }, []);

  const setNoReplyTimeout = useCallback((timeout: number) => {
    clearNoReplyTimeout();
    noReplyTimeout.current = setTimeout(() => {
      // Trigger no reply action
      if (!api().isStatus(SessionStatus.ACTIVE)) return;

      api().interact({ type: BaseRequest.RequestType.NO_REPLY, payload: null });
    }, timeout);
  }, []);

  return { setNoReplyTimeout, clearNoReplyTimeout };
};
