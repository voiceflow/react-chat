import { ComponentMeta, ComponentStory } from '@storybook/react';

import Tooltip from '.';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    onClick: { table: { disable: true } },
    orientation: {
      options: ['left', 'right'],
      control: { type: 'radio' },
      defaultValue: 'left',
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const LeftOrientation = Template.bind({});
LeftOrientation.args = {
  orientation: 'left',
};

export const RightOrientation = Template.bind({});
RightOrientation.args = {
  orientation: 'right',
};

export const Actionable = Template.bind({});
Actionable.args = {
  label: 'Action Label',
};
