import type { IThemedComponent } from '@/styles/IThemedComponent';

export interface IFeedbackButton extends IThemedComponent {
  onClick: () => void;
  variant?: 'up' | 'down';
  active?: boolean;
  testID?: string;
}
