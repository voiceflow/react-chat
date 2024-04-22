import type { AuthVerify, RuntimeInteractRequest, RuntimeInteractResponse, RuntimeOptions } from './runtime.interface';
import { RuntimeService } from './runtime.service';

export class AuthRuntimeService extends RuntimeService {
  private readonly authorization: string;

  public constructor(options: RuntimeOptions<AuthVerify>) {
    super(options);

    this.authorization = options.verify.authorization;
  }

  public async interact(request: RuntimeInteractRequest): Promise<RuntimeInteractResponse> {
    const { action, config, sessionID, versionID } = request;

    return this.send<RuntimeInteractResponse>(`state/user/${encodeURIComponent(sessionID)}/interact`, {
      method: 'POST',
      body: { action, config },
      headers: {
        authorization: this.authorization,
        sessionID,
        ...(versionID ? { versionID } : {}),
      },
      params: new URLSearchParams({ verbose: 'true' }),
    });
  }

  public async interactStream(request: RuntimeInteractRequest): Promise<RuntimeInteractResponse> {
    const { action, config, sessionID, versionID, projectID } = request;

    return this.send<RuntimeInteractResponse>(`/v2/interact/${encodeURIComponent(projectID)}/${versionID}/stream`, {
      method: 'POST',
      body: { action, config },
      headers: {
        authorization: this.authorization,
        sessionID,
        ...(versionID ? { versionID } : {}),
      },
      params: new URLSearchParams({ verbose: 'true' }),
    });
  }

  public async feedback() {
    return Promise.reject(new Error('not implemented'));
  }

  // TODO: expose authenticated publishing
  public getPublishing() {
    return Promise.reject(new Error('not implemented'));
  }

  // TODO: expose authenticated createTranscript
  public createTranscript() {
    return Promise.reject(new Error('not implemented'));
  }
}
