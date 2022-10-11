import { ChatConfig } from '@/common';

declare global {
  interface Window {
    voiceflow?: {
      config?: ChatConfig;
    };
  }
}
