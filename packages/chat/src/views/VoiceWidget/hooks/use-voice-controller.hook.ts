import { useCreateConst } from '@/hooks/cache.hook';

import type { VoiceControllerOptions } from './Voice.controller';
import { VoiceController } from './Voice.controller';

interface IUserVoiceController extends VoiceControllerOptions{
}

export const useVoiceController = (options: IUserVoiceController) => {
  const voiceController = useCreateConst(() => new VoiceController(options));

  return voiceController;
};
