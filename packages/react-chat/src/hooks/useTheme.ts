import { useEffect, useState } from 'react';

import { createCustomTheme } from '@/styles/theme';

import { Assistant } from '../common/types';

export const useTheme = (assistant?: Assistant) => {
  const [theme, setTheme] = useState('');
  useEffect(() => {
    if (assistant?.color) {
      setTheme(createCustomTheme({ color: assistant.color }));
    }
  }, [assistant?.color]);

  return theme;
};
