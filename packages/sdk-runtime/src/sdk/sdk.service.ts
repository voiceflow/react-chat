import type {
  RuntimeFeedbackRequest,
  RuntimeInteractRequest,
  RuntimeService,
} from "../runtime/index.js";
import {
  AuthRuntimeService,
  isAuthRuntimeOptions,
  isPublicRuntimeOptions,
  PublicRuntimeService,
} from "../runtime/index.js";
import type { TraceDeclaration } from "../trace/trace.interface.js";
import { TraceService } from "../trace/trace.service.js";
import type { VoiceflowRuntimeOptions } from "./sdk.interface.js";

export class VoiceflowRuntime<T> {
  private readonly runtime: RuntimeService;

  private readonly trace: TraceService<T>;

  public constructor(options: VoiceflowRuntimeOptions<T>) {
    this.trace = new TraceService(options);

    if (isAuthRuntimeOptions(options)) {
      this.runtime = new AuthRuntimeService(options);
    } else if (isPublicRuntimeOptions(options)) {
      this.runtime = new PublicRuntimeService(options);
    } else {
      throw new Error("invalid runtime options");
    }
  }

  public registerStep(step: TraceDeclaration<T, any>) {
    this.trace.registerTrace(step);
    return this;
  }

  public async interact(
    context: T,
    request: RuntimeInteractRequest
  ): Promise<T> {
    const response = await this.runtime.interact(request);
    return this.trace.processTrace(context, response);
  }

  public async feedback(request: RuntimeFeedbackRequest) {
    return this.runtime.feedback(request);
  }

  public async getPublishing(
    ...options: Parameters<RuntimeService["getPublishing"]>
  ) {
    return this.runtime.getPublishing(...options);
  }

  public async createTranscript(
    ...options: Parameters<RuntimeService["createTranscript"]>
  ) {
    return this.runtime.createTranscript(...options);
  }
}
