import type { RuntimeAction } from '@voiceflow/sdk-runtime';

import type { ChatConfig } from '@/common';

export interface ChatAPI {
  open: VoidFunction;
  close: VoidFunction;
  hide: VoidFunction;
  show: VoidFunction;
  load: (config: ChatConfig) => void;
  interact: (action: RuntimeAction) => void;
}
