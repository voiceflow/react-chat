import type { Meta } from '@storybook/react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { useState } from 'react';

import { Launcher, Proactive } from '@/components';
import { LAUNCHER_SIZE } from '@/components/Launcher/styles.css';
import { ClassName } from '@/constants';
import { createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import { ChatPosition } from '@/types';

import { ChatWindow } from '../ChatWindow';
import { ChatWidget } from '.';
import { chatContainer, LAUNCHER_MARGIN, launcherContainer, widgetContainer } from './styles.css';

export default {
  title: 'Components/ChatWidget',
  component: ChatWidget,
} as Meta;

const Template = (args) => {
  const palette = createPalette('blue');
  const [isHidden, setHidden] = useState(false);
  const [proactiveMessages, setProactiveMessages] = useState([]);
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const [isOpen, setOpen] = useState(false);
  const position = { right: 30, bottom: 30 };
  const side = ChatPosition.RIGHT;
  const chatHeight = 'calc(100vh - 60px)';

  const toggleChat = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
      style={assignInlineVars(PALETTE, { colors: palette })}
      className={clsx(ClassName.WIDGET, widgetContainer({ hidden: isHidden, withChat: isOpen }))}
    >
      <div className={launcherContainer} style={position}>
        <Proactive side={side} messages={proactiveMessages} />
        <Launcher onClick={toggleChat} isOpen={isOpen} />
      </div>
      <div
        className={chatContainer}
        style={
          isMobile
            ? {}
            : { [side]: position[side], bottom: position.bottom + LAUNCHER_SIZE + LAUNCHER_MARGIN, height: chatHeight }
        }
      >
        <ChatWindow isMobile={isMobile} />
      </div>
    </div>
  );
};

export const Base = {
  render: () => <Template />,
};
