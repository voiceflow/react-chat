import { Trace } from '@/runtime/runtime.interface.js';

import { createTraceComponent } from '../trace.component.js';

export const SpeakTraceComponent = createTraceComponent<Trace.Speak>(Trace.TraceType.SPEAK);
