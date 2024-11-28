import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { WidgetSettingsColorPalette } from '@voiceflow/dtos-interact';

import { PALETTE } from '@/styles/colors.css';

import { chatWindowStyle } from './ChatContainer.css';

export interface IChatContainer {
  palette: WidgetSettingsColorPalette;
  children?: React.ReactNode;
  isMobile?: boolean;
}

export const ChatContainer: React.FC<IChatContainer> = ({ palette, children, isMobile = false }) => {
  return (
    <div style={assignInlineVars(PALETTE, { colors: palette })} className={chatWindowStyle({ mobile: isMobile })}>
      {children}
    </div>
  );
};
