import type { Trace } from '@voiceflow/base-types';
import type { RuntimeAction } from '@voiceflow/sdk-runtime';

import type { LoadConfig } from '@/dtos/ChatConfig.dto';

declare global {
  export const __USE_SHADOW_ROOT__: boolean;

  interface VoiceflowChat {
    load: (config: LoadConfig) => Promise<void>;
    destroy: () => void;

    interact: (action: RuntimeAction) => Promise<void>;

    /* overlay mode controls */
    open: VoidFunction;
    close: VoidFunction;
    hide: VoidFunction;
    show: VoidFunction;

    proactive: {
      clear: () => void;
      push: (...messages: Trace.AnyTrace[]) => void;
    };
  }

  interface Window {
    voiceflow?: {
      chat?: VoiceflowChat;
    };
  }
}
