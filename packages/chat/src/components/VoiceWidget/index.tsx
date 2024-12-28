import { useState } from 'react';

import { Button } from '../Button';
import { ButtonIcon } from '../Button/ButtonIcon';
import { ButtonVariant } from '../Button/constants';
import { BottomLinks } from '../NewFooter/BottomLinks';
import useMicrophoneAmplitude from './use-microphone-amplitude';
import {
  buttonContent,
  buttonModifier,
  buttonText,
  circle,
  controlSection,
  imageStyles,
  linkSectionModifier,
  titleStyle,
  voiceWidgetContainer,
  voiceWrapper,
} from './VoiceWidget.css';

interface IVoiceWidget {
  imageSrc: string;
  isListening?: boolean;
  isTalking?: boolean;
  variant: 'full' | 'expanded' | 'compact';
  footer: {
    extraLinkText: string;
    extraLinkUrl: string;
    showPoweredBy: boolean;
  };
}

export const VoiceWidget: React.FC<IVoiceWidget> = ({ imageSrc, variant = 'full', isListening, isTalking, footer }) => {
  const [isCalling, setIsCalling] = useState(false);
  const { showPoweredBy, extraLinkText, extraLinkUrl } = footer;

  const amplitude = useMicrophoneAmplitude();

  const handleButtonClick = () => {
    setIsCalling((prev) => !prev);
    if (isCalling) {
      endCall();
    } else {
      startCall();
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
    title = 'Listening...';
  } else if (isTalking) {
    title = 'Talk to interrupt';
  }

  return (
    <div className={voiceWrapper}>
      <div className={voiceWidgetContainer({ type: variant })}>
        <div className={circle({ type: variant })}>
          <img
            style={{ transform: `scale(${amplitude})` }}
            src={imageSrc}
            alt="agent brand image"
            className={imageStyles}
          />
        </div>
        <div className={controlSection({ type: variant })}>
          {variant !== 'compact' && <div className={titleStyle}>{title}</div>}
          <Button
            onClick={handleButtonClick}
            variant={isCalling ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY}
            className={buttonModifier({ type: variant })}
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
        {variant === 'expanded' && (
          <BottomLinks
            extraLinkText={extraLinkText}
            extraLinkUrl={extraLinkUrl}
            showPoweredBy={showPoweredBy}
            className={linkSectionModifier}
          />
        )}
      </div>
      {variant !== 'expanded' && (
        <BottomLinks extraLinkText={extraLinkText} extraLinkUrl={extraLinkUrl} showPoweredBy={showPoweredBy} />
      )}
    </div>
  );
};