import type { BaseModels } from '@voiceflow/base-types';
import createHTTPError from 'http-errors';

import type {
  RuntimeFeedbackRequest,
  RuntimeHttpRequest,
  RuntimeInteractRequest,
  RuntimeInteractResponse,
  RuntimeOptions,
} from './runtime.interface';

export abstract class RuntimeService {
  private readonly fetch: typeof globalThis.fetch;

  public constructor(private readonly options: RuntimeOptions) {
    this.fetch = options.fetchPonyfill ?? globalThis.fetch?.bind(globalThis);
    if (!this.fetch) {
      throw new TypeError('fetch implementation was not provided and a global fetch was not available');
    }
  }

  public abstract getPublishing(request: { versionID?: string }): Promise<Record<string, unknown>>;

  public abstract createTranscript(
    sessionID: string,
    metadata: {
      os?: string;
      user?: {
        name?: string;
        image?: string;
      };
      device?: string;
      browser?: string;
    }
  ): Promise<BaseModels.Transcript.Model>;

  public abstract interact(request: RuntimeInteractRequest): Promise<Partial<RuntimeInteractResponse> & Pick<RuntimeInteractResponse, 'trace'>>;

  public abstract feedback(request: RuntimeFeedbackRequest): Promise<void>;

  protected async send<T>(path: string, args: RuntimeHttpRequest = {}): Promise<T> {
    const url = new URL(path, this.options.url);
    if (args.params) url.search = args.params.toString();

    const result = await this.fetch(url, {
      method: args.method ?? 'GET',
      body: args.body ? JSON.stringify(args.body) : undefined,
      headers: {
        'content-type': 'application/json',
        ...(args.headers ?? {}),
      },
    } as any);

    const json = (await result.json().catch(() => null)) as any;
    if (!result.ok) {
      throw createHTTPError(result.status, result.statusText, json);
    }

    return json;
  }
}
