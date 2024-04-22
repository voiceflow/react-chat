import type { BaseNode } from '@voiceflow/base-types';

import { Trace } from '@/runtime/runtime.interface.js';

import { createTraceComponent } from '../trace.component.js';

export const VisualTraceComponent = createTraceComponent<Trace.Visual & { payload: BaseNode.Visual.ImageStepData }>(
  Trace.TraceType.VISUAL
);
