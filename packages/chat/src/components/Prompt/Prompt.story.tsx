import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { WithDefaultPalette } from '@/storybook/decorators';

import { Prompt } from '.';

type Story = StoryObj<typeof Prompt>;

const InteractiveMock = (args: any) => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <div style={{ height: 250, backgroundColor: 'lavender' }} />
      <button onClick={() => setVisible((prev) => !prev)}>Show Prompt</button>
      <Prompt {...args} visible={visible} />
    </>
  );
};

const meta: Meta<typeof Prompt> = {
  title: 'Components/Chat/Prompt',
  component: Prompt,
  args: {
    cancel: { label: 'Cancel' },
  },
  render: (args) => <InteractiveMock {...args} />,
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
    accept: { label: 'Dangerous Action' },
  },
};
