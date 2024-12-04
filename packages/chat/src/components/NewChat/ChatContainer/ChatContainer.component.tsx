import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { WidgetSettingsColorPalette } from '@voiceflow/dtos-interact';
import clsx from 'clsx';

import { PALETTE } from '@/styles/colors.css';
import { chatIsOpen } from '@/views/ChatWidget/styles.css';

import { chatWindowStyle } from './ChatContainer.css';

export interface IChatContainer {
  palette: WidgetSettingsColorPalette;
  children?: React.ReactNode;
  embedded?: boolean;
}

export const ChatContainer: React.FC<IChatContainer> = ({ palette, children, embedded }) => {
  return (
    <div
      style={assignInlineVars(PALETTE, { colors: palette })}
      className={clsx(chatWindowStyle, embedded ? chatIsOpen : '')}
    >
      {children}
    </div>
  );
};
