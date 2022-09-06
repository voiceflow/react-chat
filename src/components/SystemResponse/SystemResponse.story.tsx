import { ComponentMeta, ComponentStory } from '@storybook/react';

import Chat from '@/components/Chat';

import SystemResponse, { MessageProps } from '.';

const CARD_IMAGE = 'https://source.unsplash.com/random/248x150';
const TEXT_MESSAGE: MessageProps = { type: 'text', text: 'Lorem ipsum dolor sit amet consectetur' };
const CARD: MessageProps = {
  type: 'card',
  title: 'Card Message',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
  image: CARD_IMAGE,
};

export default {
  title: 'Components/Chat/SystemResponse',
  component: SystemResponse,
  args: {
    timestamp: new Date(),
    image: 'https://source.unsplash.com/random/26x26',
  },
  argTypes: {
    timestamp: {
      control: { type: 'date' },
    },
  },
} as ComponentMeta<typeof SystemResponse>;

const Template: ComponentStory<typeof SystemResponse> = (args) => (
  <Chat.Container>
    <Chat.Dialog css={{ padding: '64px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <SystemResponse {...args} />
    </Chat.Dialog>
  </Chat.Container>
);

export const SingleText = Template.bind({});
SingleText.args = {
  messages: [TEXT_MESSAGE],
};

export const MultipleText = Template.bind({});
MultipleText.args = {
  messages: [TEXT_MESSAGE, TEXT_MESSAGE, TEXT_MESSAGE],
};

export const ActionableText = Template.bind({});
ActionableText.args = {
  ...SingleText.args,
  actions: [{ label: 'Button One' }, { label: 'Button Two' }, { label: 'Button Three' }],
};

export const Animated = Template.bind({});
Animated.args = {
  messages: [TEXT_MESSAGE, TEXT_MESSAGE, TEXT_MESSAGE],
  animated: true,
};

export const Card = Template.bind({});
Card.args = {
  messages: [CARD],
};

export const ActionableCard = Template.bind({});
ActionableCard.args = {
  messages: [
    {
      ...CARD,
      actions: [{ label: 'First Button' }, { label: 'Second Button' }, { label: 'Third Button' }],
    },
  ],
};

export const Carousel = Template.bind({});
Carousel.args = {
  messages: [
    {
      type: 'carousel',
      cards: [
        {
          title: 'First Card',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
          image: CARD_IMAGE,
        },
        {
          title: 'Second Card',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          image: CARD_IMAGE,
          actions: [{ label: 'First Button' }, { label: 'Second Button' }],
        },
        {
          title: 'Third Card',
          description: 'Lorem ipsum dolor sit amet',
          image: CARD_IMAGE,
          actions: [{ label: 'First Button' }, { label: 'Second Button' }, { label: 'Third Button' }],
        },
      ],
    },
  ],
};
