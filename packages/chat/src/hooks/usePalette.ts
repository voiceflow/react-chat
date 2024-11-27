import type { WidgetSettings } from '@voiceflow/dtos-interact';
import { useEffect, useState } from 'react';

import type { Palette } from '@/dtos/Palette.dto';

export const usePalette = (assistant?: WidgetSettings) => {
  const [palette, setPalette] = useState<Palette>();
  useEffect(() => {
    if (assistant?.common.primaryColor) {
      setPalette(assistant.common.primaryColor);
    }
  }, [assistant?.common.primaryColor]);

  return palette;
};
