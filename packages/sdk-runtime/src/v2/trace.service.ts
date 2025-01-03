import { Trace } from '@voiceflow/base-types';

import type { TraceDeclaration, TraceOptions } from '@/trace';

export class TraceService<T = unknown> {
  private readonly traces: TraceDeclaration<T, any>[] = [];

  public constructor(options: TraceOptions<T> = {}) {
    this.traces = options.traces ?? [];
  }

  public registerTrace(step: TraceDeclaration<T, any>): this {
    this.traces.push(step);
    return this;
  }

  public async processTrace(context: T, data: Trace.AnyTrace): Promise<T | null> {
    const trace = this.traces.find((trace) => trace.canHandle(data));
    if (!trace) return null;

    return trace.handle({ context }, data);
  }
}
