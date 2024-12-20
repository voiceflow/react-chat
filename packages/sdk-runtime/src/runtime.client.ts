import type { Trace } from '@voiceflow/base-types';
import { FetchClient } from '@voiceflow/fetch';
import { createParser, type EventSourceMessage } from 'eventsource-parser';

import type { RuntimeAction } from './runtime';

export interface RuntimeClientOptions {
  baseURL: string;
}

export interface InteractStreamRequest {
  projectID: string;
  userID: string;
  environment?: string;

  action: RuntimeAction;
}

export class RuntimeClient {
  private readonly fetch = new FetchClient({ baseURL: this.options.baseURL });

  constructor(private readonly options: RuntimeClientOptions) {}

  async interactStream({ projectID, userID, environment, action }: InteractStreamRequest) {
    const result = await this.fetch.post(
      `/v2/public/project/${projectID}/user/${encodeURIComponent(userID)}/interact/stream`,
      {
        query: new URLSearchParams({
          completion_events: String(true),
          ...(environment && { environment }),
        }),
        json: { action },
      }
    );

    if (!result.body) {
      throw new Error('interact stream body is empty');
    }

    const traces = new WritableStream<Trace.AnyTrace>();
    const parser = createParser({
      onEvent: (event: EventSourceMessage) => {
        traces.getWriter().write(JSON.parse(event.data));
      },
    });
    const decoder = new TextDecoder();

    const process = async () => {
      for await (const chunk of result.body!) {
        const text = decoder.decode(chunk, { stream: true });

        parser.feed(text);
      }

      await traces.close();
    };

    process().catch(async (err) => {
      console.error(err);
      await traces.abort();
    });

    return traces;
  }
}
