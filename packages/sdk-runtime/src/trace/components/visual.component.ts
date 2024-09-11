import type { BaseNode } from '@voiceflow/base-types';

import { Trace } from '@/runtime/runtime.interface';

import { createTraceComponent } from '../trace.component';

export const VisualTraceComponent = createTraceComponent<Trace.Visual & { payload: BaseNode.Visual.ImageStepData }>(
  Trace.TraceType.VISUAL
);
