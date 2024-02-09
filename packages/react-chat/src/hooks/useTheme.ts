import { useEffect, useState } from 'react';

import { createCustomTheme } from '../../setup';
import { Assistant } from '../common/types';

console.log('>>> LOADED File: packages/react-chat/src/hooks/useTheme.ts');

export const useTheme = (assistant?: Assistant) => {
  const [theme, setTheme] = useState('');
  useEffect(() => {
    if (assistant?.color) {
      setTheme(createCustomTheme({ color: assistant.color }));
    }
  }, [assistant?.color]);

  return theme;
};
