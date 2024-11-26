import { useState } from 'react';

import { Button } from '../Button';
import { ButtonIcon } from '../Button/ButtonIcon';
import { ButtonVariant } from '../Button/constants';
import {
  buttonContent,
  buttonModifier,
  buttonText,
  circle,
  controlSection,
  titleStyle,
  voiceWidgetContainer,
} from './VoiceWidget.css';

export const VoiceWidget = ({ children }: { children: React.ReactNode }) => {
  const [isCalling, setIsCalling] = useState(false);

  const handleButtonClick = () => {
    setIsCalling((prev) => !prev);
    if (isCalling) {
      endCall();
      // End call
    } else {
      startCall();
      // Start call
    }
  };

  const startCall = () => {
    // Start call
  };

  const endCall = () => {
    // End call
  };

  return (
    <div className={voiceWidgetContainer}>
      <div className={circle}>{children}</div>
      <div className={controlSection}>
        <div className={titleStyle}>How can I help you?</div>
        <Button
          onClick={handleButtonClick}
          variant={isCalling ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY}
          className={buttonModifier}
        >
          <span className={buttonContent({ isVisible: isCalling })}>
            <ButtonIcon svg="endCall" />
            <div className={buttonText}>End</div>
          </span>
          <span className={buttonContent({ isVisible: !isCalling })}>
            <ButtonIcon svg="phone" />
            <div className={buttonText}>Start a call</div>
          </span>
        </Button>
      </div>
    </div>
  );
};
