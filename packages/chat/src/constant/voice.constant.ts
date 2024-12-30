export const VOICE_STATE = {
  IDLE: 'IDLE',
  INITIALIZING: 'INITIALIZING',
  LISTENING: 'LISTENING',
  TALKING: 'TALKING',
  ENDED: 'ENDED',
};

export type VoiceState = (typeof VOICE_STATE)[keyof typeof VOICE_STATE];
