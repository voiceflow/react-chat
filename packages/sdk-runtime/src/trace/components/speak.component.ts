import { Trace } from '@/runtime/runtime.interface';

import { createTraceComponent } from '../trace.component';

export const SpeakTraceComponent = createTraceComponent<Trace.Speak>(Trace.TraceType.SPEAK);
