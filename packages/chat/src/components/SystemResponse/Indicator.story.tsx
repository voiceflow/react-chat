import type { Meta, StoryObj } from '@storybook/react';

import EMPTY_IMAGE from '../../__fixtures__/empty-image.png';
import Indicator from './Indicator';

type Story = StoryObj<typeof Indicator>;

const meta: Meta<typeof Indicator> = {
  title: 'Components/Chat/Indicator',
  component: Indicator,
  args: {
    avatar: EMPTY_IMAGE,
  },
  argTypes: {},
  excludeStories: ['RawTemplate'],
  render: (args) => <Indicator {...args} />,
};

export default meta;

export const SimpleText: Story = {
  args: {
    avatar: EMPTY_IMAGE,
  },
};
