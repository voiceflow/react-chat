import type { Meta, StoryObj } from '@storybook/react';

import { WithDefaultPalette } from '@/storybook/decorators';
import { widgetContainer } from '@/views/ChatWidget/styles.css';

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
    WithDefaultPalette,
    (Story) => (
      <div className={widgetContainer.classNames.variants.withChat.true} style={{ width: '400px', marginTop: '100px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const MockComponent = (props: Omit<INewFooter, 'messageInputProps'>) => {
  return <NewFooter messageInputProps={{ placeholder: 'Message...' }} {...props} />;
};

export const Default: Story = {
  args: {
    buttons: [],
    showPoweredBy: false,
  },
  render: (args) => <MockComponent {...args} />,
};

export const Everything: Story = {
  ...Default,
  args: {
    buttons,
    showPoweredBy: true,
  },
};

export const WithScrollButton: Story = {
  ...Default,
  args: {},
};

export const WithButtons: Story = {
  ...Default,
  args: {
    buttons,
  },
};

export const WithPoweredByAndText: Story = {
  ...Default,
  args: {
    showPoweredBy: true,
    extraLinkText: 'Extra Link',
  },
};

export const WithPoweredByAndLink: Story = {
  ...Default,
  args: {
    showPoweredBy: true,
    extraLinkText: 'Extra Link',
    extraLinkUrl: 'https://voiceflow.com',
  },
};
