import { ComponentMeta, ComponentStory } from '@storybook/react';

import Timestamp from '.';

export default {
  title: 'Core/Timestamp',
  component: Timestamp,
  argTypes: {
    value: { control: 'date' },
  },
} as ComponentMeta<typeof Timestamp>;

const Template: ComponentStory<typeof Timestamp> = (args) => <Timestamp {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: Date.now(),
};
