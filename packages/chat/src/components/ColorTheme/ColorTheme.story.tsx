import type { Meta, StoryObj } from '@storybook/react';

import { COLOR_FIXTURE } from '@/__fixtures__/colors';

import { ColorTheme } from './ColorTheme.component';

type Story = StoryObj<typeof ColorTheme>;
const meta: Meta<typeof ColorTheme> = {
  title: 'Theme/Colors',
  component: ColorTheme,
};

export default meta;

export const Primary: Story = {
  render: () => {
    return (
      <div>
        {COLOR_FIXTURE.map((color, index) => (
          <div style={{ marginBottom: '2rem' }} key={index}>
            <ColorTheme color={color} />
          </div>
        ))}
      </div>
    );
  },
};
