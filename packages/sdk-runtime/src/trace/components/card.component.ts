import type { BaseNode } from '@voiceflow/base-types';

import { createTraceComponent } from '../trace.component.js';

export const CardTraceComponent = createTraceComponent<{ type: 'card'; payload: { card: BaseNode.Card.Card } }>('card');
