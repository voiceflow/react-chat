import { assignInlineVars } from '@vanilla-extract/dynamic';

import { COLORS, createPalette } from '@/styles/colors';

import { background, messageContainer } from './UserMessage.css';

interface IUserMessage {
  children: React.ReactNode;
  from: 'system' | 'user';
  generated?: boolean;
  color?: string;
}

export const UserMessage: React.FC<IUserMessage> = ({ children, color }) => {
  const messageColor = color ? createPalette(color)[500] : COLORS.ACCENT[500];
  return (
    <div style={assignInlineVars({ [background]: messageColor })} className={messageContainer}>
      {children}
    </div>
  );
};
