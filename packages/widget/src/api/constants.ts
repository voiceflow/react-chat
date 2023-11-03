import { Assistant, ChatPersistence, ChatPosition, PRIMARY } from '@voiceflow/react-chat';

export const RUNTIME_URL = 'https://general-runtime.voiceflow.com';

export const DEFAULT_AVATAR = 'https://cdn.voiceflow.com/assets/logo.png';

export const DEFAULT_ASSISTANT: Assistant = {
  title: 'Voiceflow Assistant',
  image: DEFAULT_AVATAR,
  avatar: DEFAULT_AVATAR,
  color: PRIMARY,
  description: '',
  position: ChatPosition.RIGHT,
  watermark: true,
  feedback: false,
  persistence: ChatPersistence.LOCAL_STORAGE,
  spacing: { bottom: 30, side: 30 },
};
