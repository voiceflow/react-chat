import { Trace } from '@/runtime/runtime.interface';

import { createTraceComponent } from '../trace.component';

export const StreamTraceComponent = createTraceComponent<Trace.Stream>(Trace.TraceType.STREAM);
