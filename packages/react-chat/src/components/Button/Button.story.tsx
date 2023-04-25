import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from '.';

export default {
  title: 'Core/Button',
  component: Button,
  argTypes: {
    variant: {
      options: Object.values(Button.Variant),
      control: { type: 'radio' },
      defaultValue: Button.Variant.PRIMARY,
    },
    type: {
      if: { arg: 'variant', eq: Button.Variant.PRIMARY },
      options: ['info', 'warn', 'subtle'],
      control: { type: 'radio' },
      defaultValue: 'info',
    },
  },
  args: {
    children: 'Button Label',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const PrimaryInfo = Template.bind({});
PrimaryInfo.args = {
  variant: Button.Variant.PRIMARY,
  type: 'info',
};

export const PrimaryWarn = Template.bind({});
PrimaryWarn.args = {
  ...PrimaryInfo.args,
  type: 'warn',
};

export const PrimarySubtle = Template.bind({});
PrimarySubtle.args = {
  ...PrimaryInfo.args,
  type: 'subtle',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: Button.Variant.SECONDARY,
};
