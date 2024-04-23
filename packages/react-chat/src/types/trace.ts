import type { Trace } from '@voiceflow/base-types';
import type { TraceDeclaration } from '@voiceflow/sdk-runtime';

import type { RuntimeMessage } from '../contexts/RuntimeContext/messages';

export type TraceHandler<T extends Trace.AnyTrace = Trace.AnyTrace> = TraceDeclaration<RuntimeMessage, T>;
