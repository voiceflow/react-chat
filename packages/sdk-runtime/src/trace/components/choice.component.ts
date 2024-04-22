import { Trace } from '@/runtime/runtime.interface.js';

import { createTraceComponent } from '../trace.component.js';

export const ChoiceTraceComponent = createTraceComponent<Trace.Choice>(Trace.TraceType.CHOICE);
