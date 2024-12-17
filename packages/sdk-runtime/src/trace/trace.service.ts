/* eslint-disable max-depth */
import { createParser, type EventSourceMessage } from 'eventsource-parser';

import type { TraceDeclaration, TraceHandlerMeta, TraceOptions } from './trace.interface';

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

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public async *processTrace(context: T, traceStreams: ReadableStream): AsyncGenerator<T, void, unknown> {
    const meta: TraceHandlerMeta<T> = { context };
    let currentMessageBuffer = '';

    if (!(traceStreams instanceof ReadableStream)) {
      throw new Error('traceStreams is not a valid ReadableStream');
    }

    const reader = traceStreams.getReader();
    const decoder = new TextDecoder();
    const events: any[] = [];

    const parser = createParser({
      onEvent: (event: EventSourceMessage) => {
        try {
          const parsedData = JSON.parse(event.data);
          events.push(parsedData);
        } catch (err) {
          console.error('Failed to parse event data:', event.data, err);
        }
      },
    });

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        parser.feed(text);

        while (events.length > 0) {
          const parsedData = events[0]; // Peek the first event
          events.shift();
          try {
            if (parsedData.type === 'completion' && parsedData.payload) {
              const { state, content } = parsedData.payload;

              if (state === 'start') {
                currentMessageBuffer = '';
              } else if (state === 'content' && content) {
                currentMessageBuffer += content;
              } else if (state === 'end') {
                const completeMessage = currentMessageBuffer;
                currentMessageBuffer = '';
                const step = this.traces.find((step) => step.canHandle(parsedData));

                if (step) {
                  // eslint-disable-next-line no-await-in-loop
                  meta.context = await step.handle(meta, {
                    ...parsedData,
                    payload: { ...parsedData.payload, content: completeMessage },
                  });
                  yield meta.context;
                }
              }
            } else {
              const step = this.traces.find((step) => step.canHandle(parsedData));

              if (step) {
                // eslint-disable-next-line no-await-in-loop
                meta.context = await step.handle(meta, parsedData);

                yield meta.context;
              }
            }
          } catch (err) {
            console.error('Error processing trace:', err);
          }
        }
      }
    } catch (err) {
      console.error('Error processing stream:', err);
    } finally {
      reader.releaseLock();
    }
  }
}
