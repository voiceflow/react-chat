import type { FeedbackName } from '@/contexts/RuntimeContext/useRuntimeAPI';

export enum FeedbackButtonVariant {
  LAST_RESPONSE = 'last_response',
  PREVIOUS_RESPONSE = 'previous_response',
}

export interface IFeedbackButton {
  onClick: (feedback: FeedbackName) => void;
  variant?: FeedbackButtonVariant;
  active?: boolean;
  textContent?: string;
  testID?: string;
}
