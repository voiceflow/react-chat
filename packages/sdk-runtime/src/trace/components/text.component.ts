import { Trace } from '@/runtime/runtime.interface';

import { createTraceComponent } from '../trace.component';

export const TextTraceComponent = createTraceComponent<Trace.Text>(Trace.TraceType.TEXT);
