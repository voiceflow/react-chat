import type { Meta, StoryObj } from '@storybook/react';

import { DEFAULT_WIDGET_SETTINGS } from '@/__fixtures__/mock-assistant';
import { RuntimeProvider } from '@/contexts';
import { MOCK_IMAGE } from '@/fixtures';
import { DEFAULT_AVATAR, RenderMode } from '@/main';
import { WithDefaultPalette } from '@/storybook/decorators';
import { widgetContainer } from '@/views/ChatWidget/styles.css';

import { NewChat } from '../NewChat';
import { MessageType } from '../SystemResponse/constants';
import { SystemMessage } from '../SystemResponse/SystemMessage';
import { Carousel } from '.';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: 'Components/Carousel',
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
          ...DEFAULT_WIDGET_SETTINGS,
        }}
      >
        <div style={{ width: '380px' }} className={widgetContainer.classNames.variants.withChat.true}>
          <NewChat
            welcomeMessageProps={{
              enabled: true,
              title: 'Your awesome assistant',
              description: 'Im hot, youre not, deal with it',
            }}
            headerProps={{
              showImage: true,
              title: 'Your awesome assistant',
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
          >
            {Story()}
          </NewChat>
        </div>
      </RuntimeProvider>
    ),
    WithDefaultPalette,
  ],
};
type Story = StoryObj<typeof Carousel>;

export default meta;

const IMAGE = MOCK_IMAGE;
const FIRST_CARD = {
  title: 'First Card',
  description: 'Lorem ipsum dolor sit amet',
  image: IMAGE,
  actions: [
    { request: {} as any, name: 'First Button' },
    { request: {} as any, name: 'Second Button' },
    { request: {} as any, name: 'Third Button' },
  ],
};

const MULTIPLE_CARDS = [
  FIRST_CARD,
  {
    title: 'Second Card',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
    image: IMAGE,
  },
  {
    title: 'Third Card with a long title that wraps',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    actions: [
      { request: {} as any, name: 'Fourth Button with a long label that wraps' },
      { request: {} as any, name: 'Fifth Button' },
    ],
  },
];

export const Default: Story = {
  render: () => (
    <>
      <SystemMessage
        avatar={DEFAULT_AVATAR}
        message={{
          type: MessageType.CAROUSEL,
          cards: MULTIPLE_CARDS,
        }}
        withImage={false}
      />
      <SystemMessage
        avatar={DEFAULT_AVATAR}
        message={{
          type: MessageType.TEXT,
          text: 'Do you like this carousel ?',
        }}
        withImage={true}
      />
    </>
  ),
};

export const SingleCard: Story = {
  render: () => (
    <>
      <SystemMessage
        avatar={DEFAULT_AVATAR}
        message={{
          type: MessageType.CAROUSEL,
          cards: [FIRST_CARD],
        }}
        withImage={false}
      />
      <SystemMessage
        avatar={DEFAULT_AVATAR}
        message={{
          type: MessageType.TEXT,
          text: 'Do you like this carousel ?',
        }}
        withImage={true}
      />
    </>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <>
      <SystemMessage
        avatar={DEFAULT_AVATAR}
        message={{
          type: MessageType.CAROUSEL,
          cards: MULTIPLE_CARDS,
        }}
        withImage={false}
      />
      <SystemMessage
        avatar={DEFAULT_AVATAR}
        message={{
          type: MessageType.TEXT,
          text: 'Do you like this carousel ?',
        }}
        withImage={true}
      />
    </>
  ),
};
