import { ComponentMeta, ComponentStory } from '@storybook/react';

import Loader from '.';

export default {
  title: 'Core/Loader',
  component: Loader,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Default = Template.bind({});
