import { Trace } from '@/runtime/runtime.interface';

import { createTraceComponent } from '../trace.component';

export const CardV2TraceComponent = createTraceComponent<Trace.CardV2>(Trace.TraceType.CARD_V2);
