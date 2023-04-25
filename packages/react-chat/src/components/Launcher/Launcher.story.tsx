import { ComponentMeta, ComponentStory } from '@storybook/react';

import Launcher from '.';

export default {
  title: 'Components/Launcher',
  component: Launcher,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} as ComponentMeta<typeof Launcher>;

const Template: ComponentStory<typeof Launcher> = (args) => <Launcher {...args} />;

export const Default = Template.bind({});

export const IconOverride = Template.bind({});
IconOverride.args = {
  // eslint-disable-next-line no-secrets/no-secrets
  image: 'https://cm4-production-assets.s3.amazonaws.com/1668625107157-vf-nobg.png',
};
