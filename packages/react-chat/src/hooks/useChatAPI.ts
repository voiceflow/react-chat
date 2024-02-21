import { useEffect } from 'react';
import { PartialDeep } from 'type-fest';

import { isObject } from '@/common';
import { createPlaceholderMethods } from '@/utils/chat';

export const useChatAPI = (target: Record<string, any> | undefined, factory: () => PartialDeep<VoiceflowChat>, onReady?: () => void) =>
  useEffect(() => {
    if (!isObject(target)) return undefined;

    const noopWarn = (method: string) => () => console.warn(`Method '${method}' has no effect in this mode.`);

    const methods = factory();

    Object.assign(target, {
      open: methods.open ?? noopWarn('open'),
      close: methods.close ?? noopWarn('close'),
      hide: methods.hide ?? noopWarn('hide'),
      show: methods.show ?? noopWarn('show'),
      interact: methods.interact ?? noopWarn('interact'),
      proactive: {
        clear: methods.proactive?.clear ?? noopWarn('proactive.clear'),
        push: methods.proactive?.push ?? noopWarn('proactive.push'),
      },
    });

    onReady?.();

    return () => {
      const methods = createPlaceholderMethods(
        (method) => `Method '${method}' has no effect after 'destroy' has been called. Call 'load' to render the chat and restore this method.`
      );

      Object.assign(target, {
        ...methods,
        proactive: { ...methods.proactive },
      });
    };
  }, []);
