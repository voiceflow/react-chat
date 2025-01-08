import type { FeedbackName } from '@/contexts/RuntimeContext/useRuntimeAPI';

/**
 * Feedback buttons look different if they're on the last response from the agent
 * or if they're on a previous response from the agent, so we need this to
 * distinguish between them.
 */
export enum FeedbackButtonVariant {
  LAST_RESPONSE = 'last_response',
  PREVIOUS_RESPONSE = 'previous_response',
}

export interface IFeedbackButton {
  onClick?: (feedback: FeedbackName) => void;
  variant?: FeedbackButtonVariant;
  active?: boolean;
  textContent?: string;
  testID?: string;
}
