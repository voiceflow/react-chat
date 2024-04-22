/* eslint-disable no-restricted-syntax */
import type { RuntimeInteractResponse } from "../runtime/runtime.interface.js";
import type {
  TraceDeclaration,
  TraceHandlerMeta,
  TraceOptions,
} from "./trace.interface.js";

export class TraceService<T = unknown> {
  private readonly traces: TraceDeclaration<T, any>[] = [];

  public constructor(options: TraceOptions<T> = {}) {
    this.registerTraces(options.traces ?? []);
  }

  public registerTrace(step: TraceDeclaration<T, any>): this {
    this.traces.push(step);
    return this;
  }

  public registerTraces(steps: TraceDeclaration<T, any>[]): this {
    steps.forEach((step) => this.registerTrace(step));
    return this;
  }

  public async processTrace(
    context: T,
    response: Pick<RuntimeInteractResponse, "trace">
  ): Promise<T> {
    const meta: TraceHandlerMeta<T> = { context };

    for (const trace of response.trace) {
      const step = this.traces.find((step) => step.canHandle(trace));
      if (step) {
        // eslint-disable-next-line no-await-in-loop
        meta.context = await step.handle(meta, trace);
      }
    }
    return meta.context;
  }
}
