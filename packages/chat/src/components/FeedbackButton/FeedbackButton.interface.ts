export interface IFeedbackButton {
  onClick: () => void;
  variant?: 'up' | 'down';
  active?: boolean;
  testID?: string;
}
