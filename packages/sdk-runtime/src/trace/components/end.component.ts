import { Trace } from '@/runtime/runtime.interface.js';

import { createTraceComponent } from '../trace.component.js';

export const EndTraceComponent = createTraceComponent<Trace.End>(Trace.TraceType.END);
