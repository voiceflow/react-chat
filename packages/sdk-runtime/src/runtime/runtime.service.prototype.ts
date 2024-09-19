import type {
  PrototypeVerify,
  RuntimeInteractRequest,
  RuntimeInteractResponse,
  RuntimeOptions,
  RuntimeState,
} from '@/runtime/runtime.interface';
import { RuntimeService } from '@/runtime/runtime.service';

export class PrototypeRuntimeService extends RuntimeService {
  private state: RuntimeState = {
    turn: {},
    storage: {},
    variables: {},
  };

  private readonly versionID: string;

  public constructor(options: RuntimeOptions<PrototypeVerify>) {
    super(options);

    this.versionID = options.verify.versionID;
  }

  public async interact(request: RuntimeInteractRequest): Promise<RuntimeInteractResponse> {
    const { action, config, sessionID } = request;

    const result = await this.send<RuntimeInteractResponse>(`interact/${this.versionID}`, {
      body: { state: this.state, request: action, config },
      method: 'POST',
      headers: { sessionID, platform: 'chat-prototype' },
    });

    this.state = result.state;

    return result;
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
