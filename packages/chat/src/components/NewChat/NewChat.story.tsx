import type { Meta, StoryObj } from '@storybook/react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import EMPTY_IMAGE from '@/__fixtures__/empty-image.png';
import { SystemResponse } from '@/components';
import { RuntimeProvider } from '@/contexts';
import { RenderMode } from '@/main';
import { WithDefaultPalette } from '@/storybook/decorators';
import { COLORS, createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import { ChatPersistence, ChatPosition } from '@/types';

import { UserResponse } from '../UserResponse';
import { NewChat } from '.';

const meta: Meta = {
  title: 'Widget',

  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <RuntimeProvider
        config={{
          verify: { projectID: 'project-id' },
          url: '',
          versionID: 'version-id',
          autostart: true,
          allowDangerousHTML: true,
          user: { name: 'User' },
          render: { mode: RenderMode.OVERLAY },
        }}
        assistant={{
          title: 'Voiceflow Assistant',
          color: COLORS.ACCENT[500],
          image: EMPTY_IMAGE,
          avatar: EMPTY_IMAGE,
          launcher: undefined,
          watermark: true,
          feedback: false,
          stylesheet: undefined,
          description: '',
          position: ChatPosition.RIGHT,
          persistence: ChatPersistence.LOCAL_STORAGE,
          audioInterface: false,
          defaultAudioOutput: undefined,
          spacing: {
            side: 30,
            bottom: 30,
          },
          extensions: [],
        }}
      >
        {Story()}
      </RuntimeProvider>
    ),
    WithDefaultPalette,
  ],
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

export const Base = {
  render: () => (
    <NewChat
      title="Your AI assistant"
      image=""
      description="Hello, I am here to help with whatever you need."
      avatar={EMPTY_IMAGE}
      showPoweredBy={true}
      extraLinkText="Privacy"
      extraLinkUrl="https://voiceflow.com"
      isLoading={false}
      hasEnded={false}
      messageInputProps={{
        onSubmit: () => Promise.resolve(),
        placeholder: 'Message...',
      }}
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

export const Themed: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <div style={{ width: '400px', ...assignInlineVars(PALETTE, { colors: createPalette('red') }) }}>
        <NewChat
          title="Your AI assistant"
          image=""
          description="Hello, I am here to help with whatever you need."
          avatar={EMPTY_IMAGE}
          showPoweredBy={true}
          extraLinkText="Privacy"
          extraLinkUrl="https://voiceflow.com"
          isLoading={false}
          hasEnded={false}
          messageInputProps={{
            onSubmit: () => Promise.resolve(),
            placeholder: 'Message...',
          }}
        />
      </div>

      <div style={{ width: '400px', ...assignInlineVars(PALETTE, { colors: createPalette('green') }) }}>
        <NewChat
          title="Your AI assistant"
          image=""
          description="Hello, I am here to help with whatever you need."
          avatar={EMPTY_IMAGE}
          showPoweredBy={true}
          extraLinkText="Privacy"
          extraLinkUrl="https://voiceflow.com"
          isLoading={false}
          hasEnded={false}
          messageInputProps={{
            onSubmit: () => Promise.resolve(),
            placeholder: 'Message...',
          }}
        />
      </div>

      <div style={{ width: '400px', ...assignInlineVars(PALETTE, { colors: createPalette('purple') }) }}>
        <NewChat
          title=""
          image=""
          description=""
          avatar={EMPTY_IMAGE}
          showPoweredBy={true}
          extraLinkText="Privacy"
          extraLinkUrl="https://voiceflow.com"
          isLoading={false}
          hasEnded={false}
          messageInputProps={{
            onSubmit: () => Promise.resolve(),
            placeholder: 'Message...',
          }}
        />
      </div>
    </div>
  ),
};

export const NoPoweredBy = {
  render: () => (
    <NewChat
      title="Your AI assistant"
      image=""
      description="Let's get this party started already!"
      avatar={EMPTY_IMAGE}
      buttons={[]}
      extraLinkText="Privacy"
      extraLinkUrl="https://voiceflow.com"
      showPoweredBy={false}
      isLoading={false}
      hasEnded={false}
      messageInputProps={{ onSubmit: () => Promise.resolve(), placeholder: 'Message...' }}
    />
  ),
};

export const NoFooterLinks = {
  render: () => (
    <NewChat
      title="Your AI assistant"
      image=""
      description="Let's get this party started already!"
      avatar={EMPTY_IMAGE}
      buttons={[]}
      showPoweredBy={false}
      isLoading={false}
      hasEnded={false}
      messageInputProps={{ onSubmit: () => Promise.resolve(), placeholder: 'Message...' }}
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
      title="Your amazing assistant"
      image={EMPTY_IMAGE}
      description="Let's get this party started already!"
      avatar={EMPTY_IMAGE}
      buttons={[]}
      showPoweredBy={true}
      isLoading={false}
      hasEnded={true}
      messageInputProps={{ onSubmit: () => Promise.resolve(), placeholder: 'Message...' }}
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
