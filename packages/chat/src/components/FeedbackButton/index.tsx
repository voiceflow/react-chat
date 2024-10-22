import { assignInlineVars } from '@vanilla-extract/dynamic';

import { PALETTE } from '@/styles/colors.css';

import { activeBackground, activeIconColor, feedbackButtonStyles, iconStyle } from './FeedbackButton.css';
import type { IFeedbackButton } from './FeedbackButton.interface';
import { ThumbsDownIcon } from './ThumbsDownIcon.component';
import { ThumbsUpIcon } from './ThumbsUpIcon.component';

export const FeedbackButton: React.FC<IFeedbackButton> = ({ variant = 'up', active, onClick, testID }) => {
  const buttonActiveColor = PALETTE.colors[500];
  const iconActiveColor = PALETTE.colors[50];
  const Icon = variant === 'up' ? ThumbsUpIcon : ThumbsDownIcon;

  return (
    <button
      className={feedbackButtonStyles({ isActive: !!active })}
      onClick={onClick}
      data-testid={testID}
      style={assignInlineVars({ [activeBackground]: buttonActiveColor, [activeIconColor]: iconActiveColor })}
    >
      <Icon width={24} height={24} className={iconStyle({ isActive: !!active })} />
    </button>
  );
};
