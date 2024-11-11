import type { Meta, StoryObj } from '@storybook/react';

import { WithDefaultPalette } from '@/storybook/decorators';

import { Button } from '.';
import { ButtonVariant } from './constants';

const TEST_ID = 'test-id';

type Story = StoryObj<typeof Button>;
const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  argTypes: {
    variant: {
      options: Object.values(ButtonVariant),
      control: { type: 'radio' },
      defaultValue: ButtonVariant.PRIMARY,
    },
  },
  args: {
    children: 'Button label',
    round: false,
    onClick: () => {
      alert('Button clicked');
    },
    testID: TEST_ID,
  },
  decorators: [WithDefaultPalette],
};

export default meta;

export const Primary: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
  },
};

export const PrimaryLarge: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    large: 'true',
  },
};

export const Secondary: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
  },
};

export const SecondaryLarge: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    large: 'true',
  },
};

export const Inline: Story = {
  args: {
    variant: ButtonVariant.INLINE,
  },
};

export const InlineWrapped: Story = {
  args: {
    variant: ButtonVariant.INLINE,
    children: 'Button label that is very long and should wrap. Button label that is very long and should wrap.',
  },
  render: () => {
    return (
      <div style={{ width: '200px' }}>
        <Button variant={ButtonVariant.INLINE} large="true">
          Button label that is very long and should wrap. Button label that is very long and should wrap.
        </Button>
      </div>
    );
  },
};
