import type { Meta, StoryObj } from '@storybook/react';

import { RuntimeProvider } from '@/contexts';
import { MOCK_IMAGE } from '@/fixtures';
import { DEFAULT_AVATAR, RenderMode } from '@/main';
import { WithDefaultPalette } from '@/storybook/decorators';
import { COLORS } from '@/styles/colors';
import { ChatPersistence, ChatPosition } from '@/types';

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
          title: 'Voiceflow Assistant',
          color: COLORS.ACCENT[500],
          image: DEFAULT_AVATAR,
          avatar: DEFAULT_AVATAR,
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
    <div style={{ width: '380px' }}>
      <NewChat
        title="Your awesome assistant"
        description="Im hot, youre not, deal with it"
        avatar={DEFAULT_AVATAR}
        isLoading={false}
        image={MOCK_IMAGE}
        hasEnded={false}
        messageInputProps={{}}
      >
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
      </NewChat>
    </div>
  ),
};

export const SingleCard: Story = {
  args: {
    cards: [FIRST_CARD],
  },
};

export const MultipleCards: Story = {
  args: {
    cards: MULTIPLE_CARDS,
  },
};

// export const ControlsTemplate: Story = {
//   args: {
//     cards: MULTIPLE_CARDS,
//   },

//   render: (args) => {
//     return (
//       <>
//         <Avatar avatar={VF_ICON} />
//         <Carousel {...args} />
//       </>
//     );
//   },
// };

export const WithControls: Story = {
  args: {
    cards: MULTIPLE_CARDS,
  },
};
