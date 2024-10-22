import { assignInlineVars } from '@vanilla-extract/dynamic';

import { createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';

export const WithPalette = (Story: any, { args }: { args: any }) => {
  return (
    <div style={assignInlineVars(PALETTE, { colors: createPalette() })}>
      <Story args={{ ...args }} />
    </div>
  );
};
