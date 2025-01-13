import { useContext, useEffect, useImperativeHandle, useState } from 'react';

import { VoiceWidget as VoiceView } from '@/components/VoiceWidget';
import type { VoiceState } from '@/constant/voice.constant';
import { VOICE_STATE } from '@/constant/voice.constant';
import { RuntimeStateAPIContext } from '@/contexts';

import { useVoiceService } from './hooks/use-voice-service.hook';
import type { VoiceAPI } from './VoiceWidget.interface';

export interface IVoiceWidget {
  apiRef?: React.MutableRefObject<VoiceAPI | undefined | null>;
  isLoading?: boolean;
  onCallOverride?: () => void;
}

export const VoiceWidget = ({ apiRef, isLoading = false, onCallOverride }: IVoiceWidget) => {
  const { assistant, config } = useContext(RuntimeStateAPIContext);
  const [state, setState] = useState<VoiceState>(VOICE_STATE.IDLE);

  if (config.voice === undefined) {
    throw new Error('Voice is not configured in the config');
  }

  const voiceService = useVoiceService({
    url: config.voice.url,
    userID: config.userID,
    assistantID: config.verify.projectID,
    accessToken: config.voice.accessToken,
  });

  useImperativeHandle(apiRef, () => voiceService, [voiceService]);

  useEffect(() => voiceService.onStateUpdate((state) => setState(state)), [voiceService]);

  return (
    <VoiceView
      state={state}
      footer={assistant.common.footerLink}
      settings={assistant.voice}
      poweredBy={assistant.common.poweredBy}
      isLoading={isLoading}
      onEndCall={voiceService.endConversation}
      onStartCall={onCallOverride ?? voiceService.startConversation}
    />
  );
};
