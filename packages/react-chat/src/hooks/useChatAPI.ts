import { useEffect } from 'react';
import { isObject } from 'remeda';
import type { PartialDeep } from 'type-fest';

import { createPlaceholderMethods } from '@/utils/chat';

export const useChatAPI = (
  target: Record<string, any> | undefined,
  factory: () => PartialDeep<VoiceflowChat>,
  onReady?: () => void
) =>
  useEffect(() => {
    if (!isObject(target)) return undefined;

    const placeholders = createPlaceholderMethods((method) => `Method '${method}' has no effect in this mode.`);
    const methods = factory();

    Object.assign(target, {
      ...placeholders,
      ...methods,
      proactive: {
        ...placeholders.proactive,
        ...methods.proactive,
      },
    });

    onReady?.();

    return () => {
      const methods = createPlaceholderMethods(
        (method) =>
          `Method '${method}' has no effect after 'destroy' has been called. Call 'load' to render the chat and restore this method.`
      );

      Object.assign(target, methods);
    };
  }, []);
