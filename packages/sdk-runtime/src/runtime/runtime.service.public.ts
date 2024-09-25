import type { BaseModels } from '@voiceflow/base-types';

import type {
  PublicVerify,
  RuntimeFeedbackRequest,
  RuntimeInteractRequest,
  RuntimeInteractResponse,
  RuntimeOptions,
} from '@/runtime/runtime.interface';
import { RuntimeService } from '@/runtime/runtime.service';

export class PublicRuntimeService extends RuntimeService {
  private readonly projectID: string;

  public constructor(options: RuntimeOptions<PublicVerify>) {
    super(options);

    this.projectID = options.verify.projectID;
  }

  public async interact(request: RuntimeInteractRequest): Promise<Pick<RuntimeInteractResponse, 'trace'>> {
    const { action, config, sessionID, versionID } = request;

    return this.send<Pick<RuntimeInteractResponse, 'trace'>>(
      `public/${this.projectID}/state/user/${encodeURIComponent(sessionID)}/interact`,
      {
        method: 'POST',
        body: { action, config },
        headers: {
          ...(versionID && { versionID }),
        },
      }
    );
  }

  public async feedback(request: RuntimeFeedbackRequest): Promise<void> {
    const { versionID, sessionID, ...body } = request;

    await this.send(`feedback/${this.projectID}/user/${encodeURIComponent(sessionID)}`, {
      method: 'POST',
      body,
      headers: {
        ...(versionID && { versionID }),
      },
    });
  }

  public async getPublishing<T extends Record<string, unknown>>(request: { versionID?: string }): Promise<T> {
    const { versionID } = request;

    return this.send<T>(`public/${this.projectID}/publishing`, {
      method: 'GET',
      headers: {
        ...(versionID ? { versionID } : {}),
      },
    });
  }

  public async createTranscript(sessionID: string, metadata: { os?: string; device?: string; browser?: string }) {
    return this.send<BaseModels.Transcript.Model>(`public/${this.projectID}/transcripts`, {
      method: 'POST',
      body: { ...metadata, sessionID },
    });
  }
}
