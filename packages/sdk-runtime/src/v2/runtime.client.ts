import { FetchClient } from '@voiceflow/fetch';
import { EventSourceParserStream } from 'eventsource-parser/stream';

import type { RuntimeAction } from '@/runtime';
import type { TraceOptions } from '@/trace';

import { InteractTraceStream } from './interact-trace.stream';
import { TraceService } from './trace.service';

export interface RuntimeClientOptions<T> extends TraceOptions<T> {
  baseURL: string;
}

export interface InteractStreamRequest {
  projectID: string;
  userID: string;
  environment?: string;

  action: RuntimeAction;
}

export class RuntimeClient<T> {
  private readonly fetch = new FetchClient({ baseURL: this.options.baseURL });

  constructor(
    private readonly options: RuntimeClientOptions<T>,
    private readonly trace = new TraceService({ traces: options.traces })
  ) {}

  async interactStream(createContext: () => T, { projectID, userID, environment, action }: InteractStreamRequest) {
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

    return result.body
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(new EventSourceParserStream())
      .pipeThrough(new InteractTraceStream(createContext, this.trace));
  }
}
