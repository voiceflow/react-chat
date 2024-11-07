export interface IFeedbackButton {
  onPositiveClick: () => void;
  onNegativeClick: () => void;
  variant?: 'up' | 'down';
  active?: boolean;
  textContent?: string;
  testID?: string;
}
