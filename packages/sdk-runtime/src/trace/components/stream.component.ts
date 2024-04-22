import { Trace } from '@/runtime/runtime.interface.js';

import { createTraceComponent } from '../trace.component.js';

export const StreamTraceComponent = createTraceComponent<Trace.Stream>(Trace.TraceType.STREAM);
