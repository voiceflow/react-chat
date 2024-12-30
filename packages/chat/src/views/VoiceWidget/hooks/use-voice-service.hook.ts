import { useCreateConst } from '@/hooks/cache.hook';
import { VoiceService, VoiceServiceOptions } from '../services/voice.service';

interface IUserVoiceService extends VoiceServiceOptions {}

export const useVoiceService = (options: IUserVoiceService) => {
  const voiceService = useCreateConst(() => new VoiceService(options));

  return voiceService;
};
