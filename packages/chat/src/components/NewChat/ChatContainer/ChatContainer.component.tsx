import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { WidgetSettingsColorPalette } from '@voiceflow/dtos-interact';

import { PALETTE } from '@/styles/colors.css';

import { chatWindowStyle } from './ChatContainer.css';

export interface IChatContainer {
  palette: WidgetSettingsColorPalette;
  children?: React.ReactNode;
}

export const ChatContainer: React.FC<IChatContainer> = ({ palette, children }) => {
  return (
    <div style={assignInlineVars(PALETTE, { colors: palette })} className={chatWindowStyle}>
      {children}
    </div>
  );
};
