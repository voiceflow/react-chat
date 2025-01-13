import type { VoiceService } from './services/voice.service';

export interface VoiceAPI extends Pick<VoiceService, 'endConversation' | 'startConversation' | 'onStateUpdate'> {}
