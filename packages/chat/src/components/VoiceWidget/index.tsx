import type { WidgetSettingsCommonSettingsFooterLink, WidgetSettingsVoiceSettings } from '@voiceflow/dtos-interact';
import { WidgetSettingsVoiceRenderMode } from '@voiceflow/dtos-interact';

import type { VoiceState } from '@/constant/voice.constant';
import { VOICE_STATE } from '@/constant/voice.constant';
import { DEFAULT_CHAT_AVATAR } from '@/dtos/AssistantOptions.dto';

import { Button } from '../Button';
import { ButtonIcon } from '../Button/ButtonIcon';
import { ButtonVariant } from '../Button/constants';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { BottomLinks } from '../NewFooter/BottomLinks';
import useMicrophoneAmplitude from './use-microphone-amplitude';
import {
  buttonContent,
  buttonModifier,
  buttonText,
  circle,
  containerLoaderStyles,
  controlSection,
  imageStyles,
  linkSectionModifier,
  loaderStyles,
  titleStyle,
  voiceWidgetContainer,
  voiceWrapper,
} from './VoiceWidget.css';

interface IVoiceWidget {
  state: VoiceState;
  footer?: WidgetSettingsCommonSettingsFooterLink;
  settings?: WidgetSettingsVoiceSettings;
  poweredBy?: boolean;
  isLoading: boolean;
  onStartCall?: () => void;
  onEndCall?: () => void;
}

export const VoiceWidget: React.FC<IVoiceWidget> = ({
  state,
  settings,
  footer,
  onEndCall,
  poweredBy,
  isLoading,
  onStartCall,
}) => {
  const { content, renderMode = WidgetSettingsVoiceRenderMode.FULL } = settings ?? {};

  const startCall = () => {
    onStartCall?.();
  };

  const endCall = () => {
    onEndCall?.();
  };

  const isIdle = state === VOICE_STATE.IDLE;
  const isEnded = state === VOICE_STATE.ENDED;
  const isTalking = state === VOICE_STATE.TALKING;
  const isListening = state === VOICE_STATE.LISTENING;
  const isInitializing = state === VOICE_STATE.INITIALIZING;
  const isCalling = isTalking || isListening || isInitializing;

  const handleButtonClick = () => {
    if (isLoading) return;

    if (isCalling) {
      endCall();
    } else {
      startCall();
    }
  };

  const getTitle = () => {
    if (isIdle || isEnded) {
      return content?.callToActionText ?? 'How can I help you?';
    }

    if (isInitializing) {
      return 'Connecting...';
    }

    if (isListening) {
      return content?.listeningText ?? 'Listening...';
    }

    return content?.talkingText ?? 'Talk to interrupt';
  };

  const amplitude = useMicrophoneAmplitude();

  const isCompact = renderMode === WidgetSettingsVoiceRenderMode.COMPACT;
  const isExpanded = renderMode === WidgetSettingsVoiceRenderMode.EXPAND;

  const bottomLinks = (
    <BottomLinks
      isSmall={isExpanded}
      className={linkSectionModifier}
      extraLinkUrl={footer?.enabled ? footer.url : ''}
      extraLinkText={footer?.enabled ? footer.text : ''}
      showPoweredBy={poweredBy}
    />
  );

  return (
    <div className={voiceWrapper}>
      <div className={voiceWidgetContainer({ type: renderMode, isLoading })}>
        <div className={circle({ type: renderMode })}>
          <img
            src={content?.imageURL || DEFAULT_CHAT_AVATAR}
            alt="agent brand image"
            style={{ transform: isListening ? `scale(${amplitude})` : 'none' }}
            className={imageStyles}
          />
        </div>

        <div className={controlSection({ type: renderMode })}>
          {!isCompact && <div className={titleStyle}>{getTitle()}</div>}

          <Button
            onClick={handleButtonClick}
            variant={isCalling ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY}
            className={buttonModifier({ type: renderMode })}
          >
            <div className={containerLoaderStyles}>
              <LoadingSpinner className={loaderStyles} variant="light" size="large" />
            </div>

            <span className={buttonContent({ isVisible: isCalling })}>
              <ButtonIcon svg="endCall" />
              <div className={buttonText}>{content?.endButtonText ?? 'End'}</div>
            </span>

            <span className={buttonContent({ isVisible: !isCalling })}>
              <ButtonIcon svg="phone" />

              <div className={buttonText}>{content?.startButtonText ?? 'Start a call'}</div>
            </span>
          </Button>
        </div>

        {isExpanded && bottomLinks}
      </div>

      {!isExpanded && bottomLinks}
    </div>
  );
};
