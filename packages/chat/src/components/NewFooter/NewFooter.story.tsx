import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { INewFooter } from '.';
import { NewFooter } from '.';

type Story = StoryObj<typeof NewFooter>;

const buttons = [
  {
    label: 'Label',
    onClick: () => alert('Button 1 clicked'),
  },
  {
    label: 'Label',
    onClick: () => alert('Button 2 clicked'),
  },
  {
    label: 'Label',
    onClick: () => alert('Button 3 clicked'),
  },
  {
    label: 'Label',
    onClick: () => alert('Button 4 clicked'),
  },
  {
    label: 'Label',
    onClick: () => alert('Button 5 clicked'),
  },
  {
    label: 'Label',
    onClick: () => alert('Button 6 clicked'),
  },
  {
    label: 'Label',
    onClick: () => alert('Button 6 clicked'),
  },
];

const meta: Meta<typeof NewFooter> = {
  title: 'Components/Chat/NewFooter',
  component: NewFooter,
  decorators: [
    (Story) => (
      <div style={{ width: '400px', marginTop: '100px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const MockComponent = (props: Partial<INewFooter>) => {
  const [message, setMessage] = useState('');

  const handleValueChange = (value: string) => {
    setMessage(value);
  };

  const onSubmit = () => {
    setMessage('');
  };

  return (
    <NewFooter
      messageInputProps={{ message, onValueChange: handleValueChange, placeholder: 'Message...', onSubmit }}
      {...props}
    />
  );
};

export const Default: Story = {
  args: {
    buttons: [],
    showScrollToButton: false,
    showPoweredBy: false,
  },
  render: (args) => <MockComponent {...args} />,
};

export const Everything: Story = {
  ...Default,
  args: {
    buttons,
    showScrollToButton: true,
    showPoweredBy: true,
  },
};

export const WithScrollButton: Story = {
  ...Default,
  args: {
    showScrollToButton: true,
  },
};

export const WithButtons: Story = {
  ...Default,
  args: {
    buttons,
  },
};

export const WithPoweredBy: Story = {
  ...Default,
  args: {
    showPoweredBy: true,
  },
};
