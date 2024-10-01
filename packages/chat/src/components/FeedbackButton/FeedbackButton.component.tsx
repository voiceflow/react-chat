import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useContext } from 'react';

import { RuntimeStateAPIContext } from '@/contexts';
import { createColorPalette } from '@/styles/colors';

import { activeBackground, activeIconColor, feedbackButtonStyles, iconStyle } from './FeedbackButton.css';
import { ThumbsDownIcon } from './ThumbsDownIcon.component';
import { ThumbsUpIcon } from './ThumbsUpIcon.component';

export interface IFeedbackButton {
  onClick: () => void;
  variant?: 'up' | 'down';
  active?: boolean;
  testID?: string;
}

export const FeedbackButton: React.FC<IFeedbackButton> = ({ variant = 'up', active, onClick, testID }) => {
  const {
    assistant: { color },
  } = useContext(RuntimeStateAPIContext);

  const buttonActiveColor = createColorPalette(color)[500];
  const iconActiveColor = createColorPalette(color)[50];
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
