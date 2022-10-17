import { useEffect, useState } from 'react';

import { createCustomTheme } from '@/styles';

import { ChatConfig } from './types';

export const useTheme = (config: ChatConfig) => {
  const { color } = config.assistant;

  const [theme, setTheme] = useState('');
  useEffect(() => {
    setTheme(createCustomTheme({ color }));
  }, [color]);

  return theme;
};
