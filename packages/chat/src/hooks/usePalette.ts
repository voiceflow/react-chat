import { useEffect, useState } from 'react';

import type { AssistantOptions } from '@/dtos/AssistantOptions.dto';
import type { Palette } from '@/dtos/Palette.dto';
import { createPalette } from '@/styles/colors';

export const usePalette = (assistant?: AssistantOptions) => {
  const [palette, setPalette] = useState<Palette>();
  useEffect(() => {
    if (assistant?.color) {
      setPalette(createPalette(assistant.color));
    }
  }, [assistant?.color]);

  return palette;
};
