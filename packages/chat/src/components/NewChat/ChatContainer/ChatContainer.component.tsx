import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { WidgetSettingsColorPalette } from '@voiceflow/dtos-interact';
import clsx from 'clsx';

import { THEME } from '@/styles/colors.css';
import { FAMILY } from '@/styles/font';
import { chatIsOpen } from '@/views/ChatWidget/styles.css';

import { chatWindowStyle } from './ChatContainer.css';

export interface IChatContainer {
  palette: WidgetSettingsColorPalette;
  fontFamily?: string;
  children?: React.ReactNode;
  embedded?: boolean;
  isPopover?: boolean;
}

export const ChatContainer: React.FC<IChatContainer> = ({ palette, fontFamily, children, embedded, isPopover }) => {
  return (
    <div
      style={assignInlineVars(THEME, { colors: palette, fontFamily: fontFamily ?? FAMILY })}
      className={clsx(chatWindowStyle({ popover: isPopover }), embedded ? chatIsOpen : '')}
    >
      {children}
    </div>
  );
};
