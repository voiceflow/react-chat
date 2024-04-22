import { Trace } from '@/runtime/runtime.interface.js';

import { createTraceComponent } from '../trace.component.js';

export const TextTraceComponent = createTraceComponent<Trace.Text>(Trace.TraceType.TEXT);
