import { ChatConfig } from '../src/views/ChatWidget/types';

declare global {
  interface Window {
    voiceflow?: {
      config?: ChatConfig;
    };
  }
}
