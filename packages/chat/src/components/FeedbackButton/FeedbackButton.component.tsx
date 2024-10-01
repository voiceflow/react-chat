import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useContext } from 'react';

import { RuntimeStateAPIContext } from '@/contexts';
import { createColorPalette } from '@/styles/colors';

import { activeBackground, activeIconColor, feedbackButtonStyles, iconStyle } from './FeedbackButton.css';
import { ThumbsUpIcon } from './ThumbsUpIcon.component';

export interface IFeedbackButton {
  onClick: () => void;
  testID?: string;
}

export const FeedbackButton: React.FC<IFeedbackButton> = ({ testID }) => {
  const {
    assistant: { color },
  } = useContext(RuntimeStateAPIContext);

  const buttonActiveColor = createColorPalette(color)[500];
  const iconActiveColor = createColorPalette(color)[50];

  return (
    <button
      className={feedbackButtonStyles}
      data-testid={testID}
      style={assignInlineVars({ [activeBackground]: buttonActiveColor, [activeIconColor]: iconActiveColor })}
    >
      <ThumbsUpIcon width={24} height={24} className={iconStyle} />
    </button>
  );
};
