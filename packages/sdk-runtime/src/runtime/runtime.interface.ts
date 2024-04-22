import { BaseRequest, Trace } from '@voiceflow/base-types';

export { Trace } from '@voiceflow/base-types';

// Super broad type so that differing fetch types (ex. builtin, node-fetch, etc.) don't conflict with it
type FetchFn = (...parameters: any[]) => Promise<any>;

export interface RuntimeOptions<V = AuthVerify | PublicVerify> {
  url: string;
  verify: V;

  /**
   * A ponyfill to use for `fetch()`.
   * Defaults to the global `fetch()`.
   */
  fetchPonyfill?: FetchFn;
}

export interface AuthVerify {
  authorization: string;
}

export interface PublicVerify {
  projectID: string;
}

export const isAuthRuntimeOptions = (options: RuntimeOptions<Partial<AuthVerify & PublicVerify>>): options is RuntimeOptions<AuthVerify> => {
  return !!options?.verify?.authorization;
};

export const isPublicRuntimeOptions = (options: RuntimeOptions<Partial<AuthVerify & PublicVerify>>): options is RuntimeOptions<PublicVerify> => {
  return typeof options?.verify?.projectID === 'string';
};

export interface RuntimeInteractRequest {
  action: RuntimeAction;
  sessionID: string;
  versionID?: string;
  projectID: string;
  config?: any;
}

export interface RuntimeFeedbackRequest {
  name: string;
  sessionID: string;
  versionID?: string;

  [key: string]: any;
}

export interface RuntimeInteractResponse {
  state: RuntimeState;
  request: RuntimeAction;
  trace: Trace.AnyTrace[];
}

export type RuntimeAction =
  | BaseRequest.TextRequest
  | BaseRequest.LaunchRequest
  | BaseRequest.IntentRequest
  | BaseRequest.ActionRequest
  | BaseRequest.GeneralRequest
  | BaseRequest.BaseRequest<unknown>;

export const isRuntimeAction = (value: unknown): value is RuntimeAction =>
  typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, 'type');

export interface IntentActionPayload {
  query: string;
  intent: { name: string };
  entities: { name: string; value: string }[];
  confidence?: number;
}

export type IntentAction = BaseRequest.IntentRequest;
export type ActionType = BaseRequest.RequestType;
export const ActionType = BaseRequest.RequestType;

export const createIntentAction = (payload: BaseRequest.IntentRequestPayload): BaseRequest.IntentRequest => ({
  type: ActionType.INTENT,
  payload,
});

export interface RuntimeState {
  storage: Record<string, any>;
  variables: Record<string, any>;
}

export const isRuntimeTraceType = (value: unknown): value is Trace.TraceType =>
  typeof value === 'string' && Object.values<string>(Trace.TraceType).includes(value);

export const isRuntimeTrace = (value: unknown): value is Trace.BaseTraceFrame =>
  typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, 'type') && isRuntimeTraceType((value as any).type);

export interface RuntimeHttpRequest {
  method?: string;
  params?: URLSearchParams;
  body?: any;
  headers?: HeadersInit;
}
