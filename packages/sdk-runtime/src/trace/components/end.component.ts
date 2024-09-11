import { Trace } from '@/runtime/runtime.interface';

import { createTraceComponent } from '../trace.component';

export const EndTraceComponent = createTraceComponent<Trace.End>(Trace.TraceType.END);
