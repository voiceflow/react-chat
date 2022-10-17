import { useEffect, useState } from 'react';

import { createCustomTheme } from '@/styles';

import { Assistant } from './types';

export const useTheme = (assistant: Assistant) => {
  const { color } = assistant;

  const [theme, setTheme] = useState('');
  useEffect(() => {
    setTheme(createCustomTheme({ color }));
  }, [color]);

  return theme;
};
