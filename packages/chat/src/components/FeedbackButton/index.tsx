import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { ClassName } from '@/constants';
import { FeedbackName } from '@/contexts/RuntimeContext/useRuntimeAPI';
import { PALETTE } from '@/styles/colors.css';

import { Icon } from '../Icon';
import { CopyButtonIcon } from './CopyButtonIcon.component';
import {
  activeBackground,
  activeIconColor,
  checkedIcon,
  feedbackButtonStyles,
  feedbackContainer,
  iconStyle,
} from './FeedbackButton.css';
import { FeedbackButtonVariant, type IFeedbackButton } from './FeedbackButton.interface';
import { ThumbsDownIcon } from './ThumbsDownIcon.component';
import { ThumbsUpIcon } from './ThumbsUpIcon.component';

export const FeedbackButton: React.FC<IFeedbackButton> = ({ variant, onClick, testID, textContent }) => {
  const buttonActiveColor = PALETTE.colors[500];
  const iconActiveColor = PALETTE.colors[50];
  const [hasCopied, setHasCopied] = useState(false);
  const [isPositiveOrNegativeSelected, setIsPositiveOrNegativeSelected] = useState<FeedbackName | null>(null);

  const onCopyClick = () => {
    setHasCopied(true);
    if (!textContent) return;
    navigator.clipboard.writeText(textContent);
  };

  const handleOnClick = (type: FeedbackName) => {
    onClick(type);
    setIsPositiveOrNegativeSelected(type);
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => {
        setHasCopied(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [hasCopied]);

  return (
    <div
      className={feedbackContainer({ previousResponse: variant === FeedbackButtonVariant.PREVIOUS_RESPONSE })}
      style={assignInlineVars({ [activeBackground]: buttonActiveColor, [activeIconColor]: iconActiveColor })}
    >
      <button
        className={clsx(ClassName.FEEDBACK, feedbackButtonStyles({ isCopied: hasCopied }))}
        onClick={onCopyClick}
        data-testid={`${testID}--copy`}
      >
        {hasCopied ? (
          <Icon svg="checkmark" className={clsx(iconStyle, checkedIcon)} />
        ) : (
          <CopyButtonIcon className={iconStyle} />
        )}
      </button>
      <button
        className={clsx(
          ClassName.FEEDBACK,
          feedbackButtonStyles({ isSelected: isPositiveOrNegativeSelected === FeedbackName.POSITIVE })
        )}
        onClick={() => handleOnClick(FeedbackName.POSITIVE)}
        data-testid={`${testID}--positive`}
      >
        <ThumbsUpIcon className={iconStyle} />
      </button>
      <button
        className={clsx(
          ClassName.FEEDBACK,
          feedbackButtonStyles({ isSelected: isPositiveOrNegativeSelected === FeedbackName.NEGATIVE })
        )}
        onClick={() => handleOnClick(FeedbackName.NEGATIVE)}
        data-testid={`${testID}--negative`}
      >
        <ThumbsDownIcon className={iconStyle} />
      </button>
    </div>
  );
};
