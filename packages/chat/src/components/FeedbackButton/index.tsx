import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';

import { ClassName } from '@/constants';
import { PALETTE } from '@/styles/colors.css';

import { CopyButtonIcon } from './CopyButtonIcon.component';
import {
  activeBackground,
  activeIconColor,
  feedbackButtonStyles,
  feedbackContainer,
  iconStyle,
} from './FeedbackButton.css';
import type { IFeedbackButton } from './FeedbackButton.interface';
import { ThumbsDownIcon } from './ThumbsDownIcon.component';
import { ThumbsUpIcon } from './ThumbsUpIcon.component';

export const FeedbackButton: React.FC<IFeedbackButton> = ({
  active,
  // variant,
  onPositiveClick,
  onNegativeClick,
  testID,
  textContent,
}) => {
  const buttonActiveColor = PALETTE.colors[500];
  const iconActiveColor = PALETTE.colors[50];

  const onCopyClick = () => {
    if (!textContent) return;
    navigator.clipboard.writeText(textContent);
  };

  return (
    <div className={feedbackContainer}>
      <button
        className={clsx(ClassName.FEEDBACK, feedbackButtonStyles({ isActive: !!active }))}
        onClick={onCopyClick}
        data-testid={testID}
        style={assignInlineVars({ [activeBackground]: buttonActiveColor, [activeIconColor]: iconActiveColor })}
      >
        <CopyButtonIcon className={iconStyle({ isActive: !!active })} />
      </button>
      <button
        className={clsx(ClassName.FEEDBACK, feedbackButtonStyles({ isActive: !!active }))}
        onClick={onPositiveClick}
        data-testid={testID}
        style={assignInlineVars({ [activeBackground]: buttonActiveColor, [activeIconColor]: iconActiveColor })}
      >
        <ThumbsUpIcon className={iconStyle({ isActive: !!active })} />
      </button>
      <button
        className={clsx(ClassName.FEEDBACK, feedbackButtonStyles({ isActive: !!active }))}
        onClick={onNegativeClick}
        data-testid={testID}
        style={assignInlineVars({ [activeBackground]: buttonActiveColor, [activeIconColor]: iconActiveColor })}
      >
        <ThumbsDownIcon className={iconStyle({ isActive: !!active })} />
      </button>
    </div>
  );
};
