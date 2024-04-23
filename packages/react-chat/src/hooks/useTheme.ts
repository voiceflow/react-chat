import { useEffect, useState } from 'react';

import type { AssistantOptions } from '@/dtos/AssistantOptions.dto';
import { createCustomTheme } from '@/styles';

export const useTheme = (assistant?: AssistantOptions) => {
  const [theme, setTheme] = useState('');
  useEffect(() => {
    if (assistant?.color) {
      setTheme(createCustomTheme({ color: assistant.color }));
    }
  }, [assistant?.color]);

  return theme;
};
