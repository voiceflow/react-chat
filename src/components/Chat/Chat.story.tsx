import { ComponentMeta, ComponentStory } from '@storybook/react';

import SystemResponse from '@/components/SystemResponse';
import UserResponse from '@/components/UserResponse';

import Chat from '.';

export default {
  title: 'Templates/Chat',
  component: Chat,
  args: {
    title: 'Assistant Name',
    image: 'https://source.unsplash.com/random/72x72',
    description: "Voiceflow's virtual assistant is here to help.",
    startTime: new Date(),
  },
} as ComponentMeta<typeof Chat>;

const Template: ComponentStory<typeof Chat> = (args) => <Chat {...args} />;

export const Empty = Template.bind({});
Empty.args = {};

export const Exhaustive = Template.bind({});
Exhaustive.args = {
  children: (
    <>
      <SystemResponse
        image="https://source.unsplash.com/random/26x26"
        timestamp={new Date()}
        messages={[
          { type: 'text', text: 'Lorem ipsum dolor sit amet consectetur' },
          { type: 'text', text: 'Lorem ipsum dolor sit amet consectetur' },
          { type: 'text', text: 'Lorem ipsum dolor sit amet consectetur' },
        ]}
      />
      <UserResponse message="Lorem ipsum" />
      <SystemResponse
        image="https://source.unsplash.com/random/26x26"
        timestamp={new Date()}
        messages={[{ type: 'text', text: 'Lorem ipsum dolor sit' }]}
      />
      <UserResponse message="Lorem ipsum dolor sit amet consectetur" debug={{ message: 'Intent Name (97%)' }} />
      <SystemResponse
        image="https://source.unsplash.com/random/26x26"
        timestamp={new Date()}
        messages={[{ type: 'image', url: 'https://source.unsplash.com/random/248x200' }]}
      />
      <UserResponse message="Lorem ipsum dolor sit amet consectetur" debug={{ message: 'Intent Name (97%)' }} />
      <UserResponse message="Lorem ipsum dolor sit amet consectetur" debug={{ message: 'Intent Name (97%)' }} />
      <SystemResponse
        image="https://source.unsplash.com/random/26x26"
        timestamp={new Date()}
        messages={[
          {
            type: 'card',
            title: 'Action Card',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
            image: 'https://source.unsplash.com/random/248x150',
          },
        ]}
      />
      <UserResponse
        message="Lorem ipsum dolor sit amet"
        debug={{
          message: 'Intent Name (97%)',
          reason: 'Voluptatum quae, accusamus excepturi inventore ex quos veritatis eaque ab non?',
        }}
      />
      <SystemResponse
        image="https://source.unsplash.com/random/26x26"
        timestamp={new Date()}
        messages={[
          {
            type: 'card',
            title: 'Action Card',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
            image: 'https://source.unsplash.com/random/248x150',
            actions: [{ label: 'First Button' }, { label: 'Second Button' }, { label: 'Third Button' }],
          },
          {
            type: 'carousel',
            cards: [
              {
                title: 'First Card',
                description: 'Lorem ipsum dolor sit amet',
                image: 'https://source.unsplash.com/random/248x150',
                actions: [{ label: 'First Button' }, { label: 'Second Button' }, { label: 'Third Button' }],
              },
              {
                title: 'Second Card',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
                image: 'https://source.unsplash.com/random/248x150',
              },
              {
                title: 'Third Card',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                actions: [{ label: 'First Button' }, { label: 'Second Button' }],
              },
            ],
          },
        ]}
      />
      <UserResponse
        message="Lorem ipsum dolor sit amet consectetur"
        debug={{
          message: 'Intent Name (97%)',
          reason: 'Voluptatum quae, accusamus excepturi inventore ex quos?',
          action: { label: 'Debug Action' },
        }}
      />
      <SystemResponse
        image="https://source.unsplash.com/random/26x26"
        timestamp={new Date()}
        messages={[
          { type: 'text', text: 'Lorem ipsum dolor sit' },
          { type: 'text', text: 'Lorem ipsum dolor sit amet consectetur' },
        ]}
        actions={[{ label: 'Action One' }, { label: 'Action Two' }, { label: 'Action Three' }, { label: 'Action Four' }, { label: 'Action Five' }]}
      />
    </>
  ),
};
