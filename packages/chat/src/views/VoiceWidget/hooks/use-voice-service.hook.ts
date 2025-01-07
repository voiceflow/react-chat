import { useCreateConst } from '@/hooks/cache.hook';

import type { VoiceServiceOptions } from '../services/voice.service';
import { VoiceService } from '../services/voice.service';

interface IUserVoiceService extends VoiceServiceOptions {}

export const useVoiceService = (options: IUserVoiceService) => useCreateConst(() => new VoiceService(options));
