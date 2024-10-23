import type { Meta, StoryObj } from '@storybook/react';

import TEXT_TREATMENT_MARKDOWN from '@/__fixtures__/markdown/text-treatment.md?raw';
import { WithPalette } from '@/storybook/decorators';

import { NewChat } from '.';

const meta: Meta = {
  title: 'Widget',
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <WithPalette>
          <Story />
        </WithPalette>
      </div>
    ),
  ],

  parameters: {
    layout: 'centered',
  },
};

type Story = StoryObj<typeof NewChat>;

export default meta;

// const buttons = [
//   {
//     label: 'Who built this?',
//     onClick: () => alert('Button 1 clicked'),
//   },
//   {
//     label: "Say 'Howdy'",
//     onClick: () => alert('Button 2 clicked'),
//   },
//   {
//     label: 'LFG 🚀',
//     onClick: () => alert('Button 3 clicked'),
//   },
//   {
//     label: 'What is this?',
//     onClick: () => alert('Button 4 clicked'),
//   },
//   {
//     label: 'Label',
//     onClick: () => alert('Button 5 clicked'),
//   },
//   {
//     label: 'Label',
//     onClick: () => alert('Button 6 clicked'),
//   },
//   {
//     label: 'Label',
//     onClick: () => alert('Button 6 clicked'),
//   },
// ];

const messages = [
  {
    from: 'system',
    text: "Hey there! I'm a chatbot. I can help you with a lot of things. Try me out!",
  },

  { from: 'user', text: 'Howdy!' },
  { from: 'user', text: 'What kinda sick stuff can you do?' },
  { from: 'system', text: "You're in for a treat. We can do some pretty sick stuff." },
  { from: 'user', text: 'What kinda sick stuff can you do?' },
  { from: 'user', text: 'Rapid fire follow up' },
  { from: 'system', text: "You're in for a treat. We can do some pretty sick stuff." },
];

export const WithEntireFooter = {
  render: () => (
    <NewChat
      messages={messages}
      footerProps={{
        showPoweredBy: true,
        messageInputProps: { message: '', onSubmit: () => null, placeholder: 'Message...', onValueChange: () => null },
      }}
    />
  ),
};

export const Themed: Story = {
  render: () => (
    <WithPalette color="red">
      <NewChat
        color="orange"
        messages={messages}
        footerProps={{
          showPoweredBy: true,
          messageInputProps: {
            message: '',
            onSubmit: () => null,
            placeholder: 'Message...',
            onValueChange: () => null,
          },
        }}
      />
    </WithPalette>
  ),
};

export const BaseFooter = {
  render: () => (
    <NewChat
      messages={[{ from: 'system', text: TEXT_TREATMENT_MARKDOWN }, ...messages]}
      footerProps={{
        buttons: [],
        showPoweredBy: false,
        messageInputProps: { message: '', onSubmit: () => null, placeholder: 'Message...', onValueChange: () => null },
      }}
    />
  ),
};