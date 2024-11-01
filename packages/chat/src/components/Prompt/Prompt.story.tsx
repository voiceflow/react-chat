import type { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';

import { ClassName } from '@/constants';
import { WithDefaultPalette } from '@/storybook/decorators';

import { chatContainer as widgetContainer } from '../../views/ChatWidget/styles.css';
import { ButtonVariant } from '../Button/constants';
import { chatContainer, dialogContainer } from '../NewChat/NewChat.css';
import { Prompt } from '.';

type Story = StoryObj<typeof Prompt>;

const meta: Meta<typeof Prompt> = {
  title: 'Components/Chat/Prompt',
  component: Prompt,
  args: {
    cancel: { label: 'Cancel' },
  },
  render: (args) => (
    <div className={widgetContainer}>
      <div className={clsx(ClassName.CHAT, chatContainer)}>
        <div className={dialogContainer}></div>
        <Prompt {...args} />
      </div>
    </div>
  ),
  decorators: [WithDefaultPalette],
};

export default meta;

export const Base: Story = {
  args: {
    visible: true,
    accept: { label: 'Primary Action' },
  },
};

export const Dangerous: Story = {
  args: {
    visible: true,
    accept: { label: 'End Chat', variant: ButtonVariant.WARN },
    cancel: { label: 'Cancel' },
  },
};
