import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useRef } from 'react';

import Avatar from '@/components/Avatar';
import Chat from '@/components/Chat';
import SystemResponse from '@/components/SystemResponse';
import { VF_ICON } from '@/fixtures';
import { ChatWidget } from '@/views';

import Carousel from '.';

const IMAGE = 'https://source.unsplash.com/featured/248x150';
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
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
    image: IMAGE,
  },
  {
    title: 'Third Card',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    actions: [
      { request: {} as any, name: 'Fourth Button' },
      { request: {} as any, name: 'Fifth Button' },
    ],
  },
];

export default {
  title: 'Components/Carousel',
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => <Carousel {...args} />;

export const SingleCard = Template.bind({});
SingleCard.args = {
  cards: [FIRST_CARD],
};

export const MultipleCards = Template.bind({});
MultipleCards.args = {
  cards: MULTIPLE_CARDS,
};

const ControlsTemplate: ComponentStory<typeof Carousel> = (args) => {
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
};

export const WithControls = ControlsTemplate.bind({});
WithControls.args = {
  cards: MULTIPLE_CARDS,
};
