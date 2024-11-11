export enum FeedbackButtonVariant {
  LAST_RESPONSE = 'last_response',
  PREVIOUS_RESPONSE = 'previous_response',
}

export interface IFeedbackButton {
  onPositiveClick: () => void;
  onNegativeClick: () => void;
  variant?: FeedbackButtonVariant;
  active?: boolean;
  textContent?: string;
  testID?: string;
}
