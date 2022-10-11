import { useMemo } from 'react';

import { isObject } from '../src/views/ChatWidget/types';

export const useConfig = () => {
  return useMemo(() => {
    // setup check
    if (!isObject(window.voiceflow) || !window.voiceflow.config) {
      throw new Error('window.voiceflow config not initialized');
    }
    if (!window.voiceflow.config.projectID) {
      throw new Error('window.voiceflow.config.projectID not initialized');
    }
    return window.voiceflow.config;
  }, []);
};
