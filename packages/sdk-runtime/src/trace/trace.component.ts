import type { Trace } from '../runtime/runtime.interface';
import type { TraceAccumulator, TraceDeclaration } from './trace.interface';

export interface TraceComponentOverload<T extends Trace.BaseTraceFrame> {
  <Context>(declaration: TraceDeclaration<Context, T>): Required<TraceDeclaration<Context, T>>;
  <Context>(handle: TraceAccumulator<Context, T>): Required<TraceDeclaration<Context, T>>;
}

export const createTraceComponent =
  <T extends Trace.BaseTraceFrame>(type: T['type']): TraceComponentOverload<T> =>
  <Context>(handle: TraceDeclaration<Context, T> | TraceAccumulator<Context, T>): TraceDeclaration<Context, T> => {
    if (typeof handle === 'function') {
      return {
        canHandle: (trace) => trace.type === type,
        handle,
      };
    }

    return handle;
  };
