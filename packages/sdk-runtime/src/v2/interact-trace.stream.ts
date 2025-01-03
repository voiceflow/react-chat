import type { EventSourceMessage } from 'eventsource-parser';

import type { TraceService } from './trace.service';

export class InteractTraceStream<T> extends TransformStream<EventSourceMessage, T> {
  constructor(
    private readonly createContext: () => T,
    private readonly trace: TraceService<T>
  ) {
    super({
      // start: () => {},
      // flush: () => {},

      transform: async (chunk, controller) => {
        const data = JSON.parse(chunk.data);
        const trace = await this.trace.processTrace(this.createContext(), data);
        if (!trace) return;

        controller.enqueue(trace);
      },
    });
  }
}
