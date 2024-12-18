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

  public async *processTrace(context: T, traceStreams: ReadableStream): AsyncGenerator<T, void, unknown> {
    const meta: TraceHandlerMeta<T> = { context };
    const currentMessageBuffer = '';
    const inMessage = false;
    let isDone = false;
    const processedIDs: string[] = [];
    if (!(traceStreams instanceof ReadableStream)) {
      throw new Error('traceStreams is not a valid ReadableStream');
    }

    const reader = traceStreams.getReader();
    const decoder = new TextDecoder();
    const events: any[] = [];

    const parser = createParser({
      onEvent: (event: EventSourceMessage) => {
        try {
          const eventID = event.id;
          if (eventID && !processedIDs.includes(eventID)) {
            console.log('Processing event:', eventID);
            processedIDs.push(eventID);
            const parsedData = JSON.parse(event.data);
            events.push(parsedData);
          } else {
            console.log('Skipping event:', eventID);
          }
        } catch (err) {
          console.error('Failed to parse event data:', event.data, err);
        }
      },
    });

    try {
      while (!isDone) {
        // eslint-disable-next-line no-await-in-loop
        const { value, done } = await reader.read();

        if (done) {
          isDone = true;
          break;
        }

        const text = decoder.decode(value, { stream: true });
        parser.feed(text);
        // Process all newly parsed events one-by-one

        while (events.length > 0) {
          const parsedData = events.shift();
          try {
            if (parsedData.type !== 'completion') {
              const step = this.traces.find((step) => step.canHandle(parsedData));
              if (step) {
                const result = step.handle(meta, parsedData);
                meta.context = result;
              }
            }
            if (parsedData.type === 'completion' && parsedData.payload) {
              const { state, content } = parsedData.payload;
              if (state === 'start') {
                yield { stage: 'start' };
              } else if (state === 'content' && content) {
                yield { stage: 'content', content };
              } else if (state === 'end') {
                yield { stage: 'end' };
              }
            }
          } catch (err) {
            console.error('Error processing trace:', err);
          }
        }
      }
      yield meta.context;
    } catch (err) {
      console.error('Error processing stream:', err);
    } finally {
      reader.releaseLock();
    }
  }
}
