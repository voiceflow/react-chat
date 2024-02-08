import { useEffect, useState } from 'react';

import { createCustomTheme } from '@/styles';

import { Assistant } from './types';

export const useTheme = (assistant?: Assistant) => {
  const [theme, setTheme] = useState('');
  useEffect(() => {
    if (assistant?.color) {
      setTheme(createCustomTheme({ color: assistant.color }));
    }
  }, [assistant?.color]);

  return theme;
};
