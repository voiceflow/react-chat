import type { IThemedComponent } from '@/types/IThemedComponent';

export interface IFeedbackButton extends IThemedComponent {
  onClick: () => void;
  variant?: 'up' | 'down';
  active?: boolean;
  testID?: string;
}
