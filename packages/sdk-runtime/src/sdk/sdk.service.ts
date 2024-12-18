import type { RuntimeFeedbackRequest, RuntimeInteractRequest, RuntimeService } from '@/runtime';
import {
  AuthRuntimeService,
  isAuthRuntimeOptions,
  isPrototypeRuntimeOptions,
  isPublicRuntimeOptions,
  PrototypeRuntimeService,
  PublicRuntimeService,
} from '@/runtime';
import type { TraceDeclaration } from '@/trace/trace.interface';
import { TraceService } from '@/trace/trace.service';

import type { VoiceflowRuntimeOptions } from './sdk.interface';

export class VoiceflowRuntime<T> {
  private readonly runtime: RuntimeService;

  private readonly trace: TraceService<T>;

  public constructor(options: VoiceflowRuntimeOptions<T>) {
    this.trace = new TraceService(options);
    if (isPrototypeRuntimeOptions(options)) {
      this.runtime = new PrototypeRuntimeService(options);
    } else if (isAuthRuntimeOptions(options)) {
      this.runtime = new AuthRuntimeService(options);
    } else if (isPublicRuntimeOptions(options)) {
      this.runtime = new PublicRuntimeService(options);
    } else {
      throw new Error('invalid runtime options');
    }
  }

  public registerStep(step: TraceDeclaration<T, any>) {
    this.trace.registerTrace(step);
    return this;
  }

  public async interact(
    context: T,
    request: RuntimeInteractRequest
  ): Promise<AsyncGenerator<T | ReadableStream, void, unknown>> {
    const response = await this.runtime.interact(request);
    return this.trace.processTrace(context, response);
  }

  public async feedback(request: RuntimeFeedbackRequest) {
    return this.runtime.feedback(request);
  }

  public async getPublishing<T extends Record<string, unknown>>(
    ...options: Parameters<RuntimeService['getPublishing']>
  ) {
    return this.runtime.getPublishing<T>(...options);
  }

  public async createTranscript(...options: Parameters<RuntimeService['createTranscript']>) {
    return this.runtime.createTranscript(...options);
  }
}
