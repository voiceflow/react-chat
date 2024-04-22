import type { RuntimeOptions } from '../runtime/runtime.interface';
import type { TraceOptions } from '../trace/trace.interface';

export type VoiceflowRuntimeOptions<T> = RuntimeOptions & TraceOptions<T>;
