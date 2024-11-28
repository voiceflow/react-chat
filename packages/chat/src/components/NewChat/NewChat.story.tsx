import type { Meta, StoryObj } from '@storybook/react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useState } from 'react';

import EMPTY_IMAGE from '@/__fixtures__/empty-image.png';
import { SystemResponse } from '@/components';
import { WithDefaultPalette, WithRuntimeProvider } from '@/storybook/decorators';
import { createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';

import Indicator from '../SystemResponse/Indicator/Indicator';
import { UserResponse } from '../UserResponse';
import { NewChat } from '.';

const meta: Meta = {
  title: 'Widget',

  parameters: {
    layout: 'centered',
  },
  decorators: [WithRuntimeProvider, WithDefaultPalette],
};

type Story = StoryObj<typeof NewChat>;

export default meta;

const AgentSays = (messages: string[]) => (
  <SystemResponse
    avatar={EMPTY_IMAGE}
    timestamp={Date.now()}
    messages={messages.map((m) => ({ type: 'text', text: m }))}
  />
);
const UserSays = (text: string) => <UserResponse message={text} timestamp={Date.now()} />;

const MockBaseComponent = ({ isLoading }: { isLoading?: boolean }) => {
  const [messages, setMessages] = useState([
    { type: 'User', text: 'Cool, great weather ☀️' },
    {
      type: 'User',
      text: 'How bout you? What about Bob? How has he been. Is he ok. Should I separate these messages?',
    },
    { type: 'Agent', text: 'Howdy, great to meet you!' },
    { type: 'Agent', text: 'What up' },
    { type: 'User', text: 'How bout you?' },
    { type: 'Agent', text: 'Howdy, great to meet you!' },
    { type: 'Agent', text: 'What up' },
    { type: 'User', text: 'How bout you?' },
    { type: 'Agent', text: 'Howdy, great to meet you!' },
    { type: 'Agent', text: 'What up' },
    { type: 'User', text: 'How bout you? Hows it going does this hit the loading state at the bottom of the chat?' },
  ]);

  const agentResponses = [
    'How are you today?',
    'Nice to hear from you!',
    'I’m here to help!',
    'What can I do for you?',
    'Good to see you!',
  ];

  const handleSubmit = async (userText: string): Promise<void> => {
    if (!userText) return;

    // Add the new User message
    const newMessages = [...messages];

    // Add a random Agent response
    const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];
    newMessages.push({ type: 'Agent', text: randomResponse });

    setMessages(newMessages);
  };

  return (
    <NewChat
      welcomeMessageProps={{
        enabled: true,
        title: 'Your AI assistant',
        description: 'Hello, I am here to help with whatever you need.',
      }}
      headerProps={{
        title: 'Your AI assistant',
      }}
      footerProps={{
        showPoweredBy: true,
        extraLinkText: 'Privacy',
        extraLinkUrl: 'https://voiceflow.com',
        messageInputProps: {
          onSubmit: async (text) => handleSubmit(text),
          placeholder: 'Message...',
        },
      }}
      isLoading={false}
      hasEnded={false}
    >
      {messages.map((msg) => (msg.type === 'Agent' ? AgentSays([msg.text]) : UserSays(msg.text)))}
      {isLoading && <Indicator avatar={EMPTY_IMAGE} />}
    </NewChat>
  );
};

export const Base = {
  render: () => <MockBaseComponent />,
};

export const BaseThemed = {
  render: () => (
    <div style={assignInlineVars(PALETTE, { colors: createPalette('red') })}>
      <MockBaseComponent />
    </div>
  ),
};

export const LoadingState = {
  render: () => <MockBaseComponent isLoading={true} />,
};

export const Themed: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <div style={{ width: '400px', ...assignInlineVars(PALETTE, { colors: createPalette('red') }) }}>
        <NewChat
          welcomeMessageProps={{
            enabled: true,
            title: 'Your AI assistant',
            description: 'Hello, I am here to help with whatever you need.',
          }}
          headerProps={{
            title: 'Your AI assistant',
          }}
          footerProps={{
            showPoweredBy: true,
            extraLinkText: 'Privacy',
            extraLinkUrl: 'https://voiceflow.com',
            messageInputProps: {
              onSubmit: async (_) => Promise.resolve(),
              placeholder: 'Message...',
            },
          }}
          isLoading={false}
          hasEnded={false}
        />
      </div>

      <div style={{ width: '400px', ...assignInlineVars(PALETTE, { colors: createPalette('green') }) }}>
        <NewChat
          welcomeMessageProps={{
            enabled: true,
            title: 'Your AI assistant',
            description: 'Hello, I am here to help with whatever you need.',
          }}
          headerProps={{
            title: 'Your AI assistant',
          }}
          footerProps={{
            showPoweredBy: true,
            extraLinkText: 'Privacy',
            extraLinkUrl: 'https://voiceflow.com',
            messageInputProps: {
              onSubmit: async (_) => Promise.resolve(),
              placeholder: 'Message...',
            },
          }}
          isLoading={false}
          hasEnded={false}
        />
      </div>

      <div style={{ width: '400px', ...assignInlineVars(PALETTE, { colors: createPalette('purple') }) }}>
        <NewChat
          welcomeMessageProps={{
            enabled: true,
            title: '',
            description: '',
          }}
          headerProps={{
            title: 'Your AI assistant',
          }}
          footerProps={{
            showPoweredBy: true,
            extraLinkText: 'Privacy',
            extraLinkUrl: 'https://voiceflow.com',
            messageInputProps: {
              onSubmit: async (_) => Promise.resolve(),
              placeholder: 'Message...',
            },
          }}
          isLoading={false}
          hasEnded={false}
        />
      </div>
    </div>
  ),
};

export const NoPoweredBy = {
  render: () => (
    <NewChat
      welcomeMessageProps={{
        enabled: true,
        title: 'Your AI assistant',
        description: "Let's get this party started already!",
      }}
      headerProps={{
        title: 'Your AI assistant',
      }}
      footerProps={{
        showPoweredBy: false,
        extraLinkText: 'Privacy',
        extraLinkUrl: 'https://voiceflow.com',
        messageInputProps: {
          onSubmit: async (_) => Promise.resolve(),
          placeholder: 'Message...',
        },
      }}
      isLoading={false}
      hasEnded={false}
    />
  ),
};

export const OnlyPoweredBy = {
  render: () => (
    <NewChat
      welcomeMessageProps={{
        enabled: true,
        title: 'Your AI assistant',
        description: 'Hello, I am here to help with whatever you need.',
      }}
      headerProps={{
        title: 'Your AI assistant',
      }}
      footerProps={{
        showPoweredBy: true,
        extraLinkText: '',
        extraLinkUrl: '',
        messageInputProps: {
          onSubmit: async (_) => Promise.resolve(),
          placeholder: 'Message...',
        },
      }}
      isLoading={false}
      hasEnded={false}
    />
  ),
};

export const NoFooterLinks = {
  render: () => (
    <NewChat
      welcomeMessageProps={{
        enabled: true,
        title: 'Your AI assistant',
        description: 'Hello, I am here to help with whatever you need.',
      }}
      headerProps={{
        title: 'Your AI assistant',
      }}
      footerProps={{
        showPoweredBy: false,
        extraLinkText: '',
        extraLinkUrl: '',
        messageInputProps: {
          onSubmit: async (_) => Promise.resolve(),
          placeholder: 'Message...',
        },
      }}
      isLoading={false}
      hasEnded={false}
    >
      {AgentSays(['👋🏻 Good morning!', 'How are you today?', 'How can I help you ?'])}
      {UserSays('How bout you?')}
      {AgentSays(['Thanks for asking', 'here are some cool emojis:', '😝 ✌️ ☎️  🤦🏼‍♀️  🤯'])}
      {AgentSays(['Anything else I can do to help you today?'])}
      {UserSays('Dont think so. Everything else is amazing!')}
      {AgentSays(['ok, so bye for now'])}
    </NewChat>
  ),
};

export const ChatEnded = {
  render: () => (
    <NewChat
      welcomeMessageProps={{
        enabled: true,
        title: 'Your amazing assistant',
        description: "Let's get this party started already!",
      }}
      headerProps={{
        title: 'Your AI assistant',
      }}
      footerProps={{
        showPoweredBy: true,
        extraLinkText: 'Privacy',
        extraLinkUrl: 'https://voiceflow.com',
        messageInputProps: {
          onSubmit: async (_) => Promise.resolve(),
          placeholder: 'Message...',
        },
      }}
      isLoading={false}
      hasEnded={true}
    >
      {AgentSays(['👋🏻 Good morning!', 'How are you today?', 'How can I help you ?'])}
      {UserSays('How bout you?')}
      {AgentSays(['Thanks for asking', 'here are some cool emojis:', '😝 ✌️ ☎️  🤦🏼‍♀️  🤯'])}
      {UserSays('Cool, I *LOVE* emojis!')}
      {AgentSays(["I know.\nThat's why I sent you some."])}
      {UserSays('🤯')}
      {AgentSays(['Anything else I can do to help you today?'])}
      {UserSays('Dont think so. Everything else is amazing!')}
      {AgentSays(['ok, so bye for now'])}
    </NewChat>
  ),
};
