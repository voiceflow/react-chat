import type { Trace } from '../runtime/runtime.interface';

export interface TraceOptions<T> {
  traces?: TraceDeclaration<T, any>[];
}

export interface TraceDeclaration<Context, T extends Trace.BaseTraceFrame> {
  canHandle: TraceCanHandle<T>;
  handle: TraceAccumulator<Context, T>;
}

export type TraceCanHandle<T extends Trace.BaseTraceFrame> = (trace: T) => boolean;

export interface TraceHandlerMeta<Context> {
  context: Context;
}

export type TraceAccumulator<Context, T extends Trace.BaseTraceFrame> = (meta: TraceHandlerMeta<Context>, trace: T) => Context;
