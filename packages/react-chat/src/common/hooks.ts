import { useEffect, useState } from 'react';

import { useStitches } from '@/useStitches';

import { Assistant } from './types';

export const useTheme = (assistant?: Assistant) => {
  const [theme, setTheme] = useState('');
  const { createTheme } = useStitches();
  useEffect(() => {
    if (assistant?.color) {
      setTheme(createTheme({ color: assistant.color }));
    }
  }, [assistant?.color]);

  return theme;
};
