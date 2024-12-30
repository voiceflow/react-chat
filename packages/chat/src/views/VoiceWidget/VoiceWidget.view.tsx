import { useContext, useEffect, useState } from 'react';

import { VoiceWidget as VoiceView } from '@/components/VoiceWidget';
import type { VoiceState } from '@/constant/voice.constant';
import { VOICE_STATE } from '@/constant/voice.constant';
import { RuntimeStateAPIContext } from '@/contexts';

import { useVoiceController } from './hooks/use-voice-controller.hook';

export const VoiceWidget = () => {
  const { assistant, config } = useContext(RuntimeStateAPIContext);
  const [state, setState] = useState<VoiceState>(VOICE_STATE.IDLE);

  if (config.voice === undefined) {
    throw new Error('Voice is not configured in the config');
  }

  const voiceController = useVoiceController({
    url: config.voice.url,
    userID: config.userID,
    assistantID: config.verify.projectID,
    accessToken: config.voice.accessToken,
  });

  useEffect(() => voiceController.onStateUpdate((state) => setState(state)), [voiceController]);

  return (
    <VoiceView
      state={state}
      footer={assistant.common.footerLink}
      settings={assistant.voice}
      poweredBy={assistant.common.poweredBy}
      onEndCall={voiceController.endConversation}
      onStartCall={voiceController.startConversation}
    />
  );
};
