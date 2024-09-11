import { Trace } from '@/runtime/runtime.interface';

import { createTraceComponent } from '../trace.component';

export const ChoiceTraceComponent = createTraceComponent<Trace.Choice>(Trace.TraceType.CHOICE);
