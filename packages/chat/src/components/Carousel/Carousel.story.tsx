import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';

import Avatar from '@/components/Avatar';
import Chat from '@/components/Chat';
import SystemResponse from '@/components/SystemResponse';
import { MOCK_IMAGE, VF_ICON } from '@/fixtures';
import { ChatWidget } from '@/views';

import Carousel from '.';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: 'Components/Carousel',
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

export const ControlsTemplate: Story = {
  args: {
    cards: MULTIPLE_CARDS,
  },

  render: (args) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);

    return (
      <ChatWidget.ChatContainer>
        <Chat.Dialog>
          <SystemResponse.Controls ref={controlsRef} />
          <SystemResponse.Container ref={containerRef} withImage scrollable>
            <Avatar avatar={VF_ICON} />
            <Carousel {...args} controlsRef={controlsRef} containerRef={containerRef} />
          </SystemResponse.Container>
        </Chat.Dialog>
      </ChatWidget.ChatContainer>
    );
  },
};

export const WithControls: Story = {
  args: {
    cards: MULTIPLE_CARDS,
  },
};
