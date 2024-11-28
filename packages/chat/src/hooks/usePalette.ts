import { useEffect, useState } from 'react';

import type { Palette } from '@/dtos/Palette.dto';
import type { ChatWidgetSettings } from '@/types';

export const usePalette = (assistant?: ChatWidgetSettings) => {
  const [palette, setPalette] = useState<Palette>();
  useEffect(() => {
    if (assistant?.common.primaryColor?.palette) {
      setPalette(assistant.common.primaryColor.palette);
    }
  }, [assistant?.common.primaryColor]);

  return palette;
};
