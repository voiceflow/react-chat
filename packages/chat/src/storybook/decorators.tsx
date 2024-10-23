import { assignInlineVars } from '@vanilla-extract/dynamic';

import { createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';

export const WithPalette = ({ color, children }: { args?: any; color?: string; children: any }) => {
  return <div style={assignInlineVars(PALETTE, { colors: createPalette(color) })}>{children}</div>;
};
