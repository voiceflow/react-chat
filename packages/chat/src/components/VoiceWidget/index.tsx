import { useState } from 'react';

import { Button } from '../Button';
import { ButtonIcon } from '../Button/ButtonIcon';
import { ButtonVariant } from '../Button/constants';
import { BottomLinks } from '../NewFooter/BottomLinks';
import {
  buttonContent,
  buttonModifier,
  buttonText,
  circle,
  controlSection,
  titleStyle,
  voiceWidgetContainer,
  voiceWrapper,
} from './VoiceWidget.css';

interface IVoiceWidget {
  children: React.ReactNode;
  isListening?: boolean;
  isTalking?: boolean;
  footer: {
    extraLinkText: string;
    extraLinkUrl: string;
    showPoweredBy: boolean;
  };
}

export const VoiceWidget: React.FC<IVoiceWidget> = ({ children, isListening, isTalking, footer }) => {
  const [isCalling, setIsCalling] = useState(false);
  const { showPoweredBy, extraLinkText, extraLinkUrl } = footer;
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

  let title = '';
  if (!isCalling) {
    title = 'How can I help you?';
  } else if (isListening) {
    title = 'Listening';
  } else if (isTalking) {
    title = 'Talk to interupt';
  }

  return (
    <div className={voiceWrapper}>
      <div className={voiceWidgetContainer}>
        <div className={circle}>{children}</div>
        <div className={controlSection}>
          <div className={titleStyle}>{title}</div>
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
      <BottomLinks extraLinkText={extraLinkText} extraLinkUrl={extraLinkUrl} showPoweredBy={showPoweredBy} />
    </div>
  );
};
