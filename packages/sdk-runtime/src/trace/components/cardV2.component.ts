import { Trace } from '@/runtime/runtime.interface.js';

import { createTraceComponent } from '../trace.component.js';

export const CardV2TraceComponent = createTraceComponent<Trace.CardV2>(Trace.TraceType.CARD_V2);
