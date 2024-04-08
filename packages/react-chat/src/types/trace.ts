import { Trace } from '@voiceflow/base-types';
import { TraceDeclaration } from '@voiceflow/sdk-runtime';

import { RuntimeMessage } from '../contexts/RuntimeContext/messages';

export type TraceHandler<Trace extends Trace.AnyTrace = Trace.AnyTrace> = TraceDeclaration<RuntimeMessage, Trace>;
