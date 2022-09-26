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

export const UserSimpleResponse = Template.bind({});
UserSimpleResponse.args = {
  children: <UserResponse timestamp={new Date()} message="Lorem ipsum" />,
};

export const UserMultilineResponse = Template.bind({});
UserMultilineResponse.args = {
  children: <UserResponse timestamp={new Date()} message="Lorem ipsum dolor sit amet consectetur" />,
};

export const UserDebugResponse = Template.bind({});
UserDebugResponse.args = {
  children: (
    <UserResponse
      timestamp={new Date()}
      message="Lorem ipsum dolor sit amet consectetur"
      debug={{
        message: 'Intent Name (97%)',
        reason: 'Voluptatum quae, accusamus excepturi inventore ex quos?',
        action: { label: 'Debug Action' },
      }}
    />
  ),
};

export const SystemSimpleResponse = Template.bind({});
SystemSimpleResponse.args = {
  children: (
    <SystemResponse
      image="https://source.unsplash.com/random/26x26"
      timestamp={new Date()}
      messages={[{ type: 'text', text: 'Lorem ipsum dolor sit' }]}
      messageDelay={2000}
    />
  ),
};

export const SystemTextResponse = Template.bind({});
SystemTextResponse.args = {
  children: (
    <SystemResponse
      image="https://source.unsplash.com/random/26x26"
      timestamp={new Date()}
      messages={[{ type: 'text', text: 'Lorem ipsum dolor sit amet consectetur' }]}
      messageDelay={2000}
    />
  ),
};

export const SystemMultipleTextResponse = Template.bind({});
SystemMultipleTextResponse.args = {
  children: (
    <SystemResponse
      image="https://source.unsplash.com/random/26x26"
      timestamp={new Date()}
      messages={[
        { type: 'text', text: 'Lorem ipsum dolor sit amet consectetur' },
        { type: 'text', text: 'Lorem ipsum dolor sit amet consectetur' },
        { type: 'text', text: 'Lorem ipsum dolor sit amet consectetur' },
      ]}
      messageDelay={2000}
    />
  ),
};

export const SystemActionResponse = Template.bind({});
SystemActionResponse.args = {
  children: (
    <SystemResponse
      image="https://source.unsplash.com/random/26x26"
      timestamp={new Date()}
      messages={[{ type: 'text', text: 'Lorem ipsum dolor sit amet consectetur' }]}
      messageDelay={2000}
      actions={[{ label: 'Action One' }, { label: 'Action Two' }, { label: 'Action Three' }, { label: 'Action Four' }, { label: 'Action Five' }]}
    />
  ),
};

export const SystemImageResponse = Template.bind({});
SystemImageResponse.args = {
  children: (
    <SystemResponse
      image="https://source.unsplash.com/random/26x26"
      timestamp={new Date()}
      messages={[{ type: 'image', url: 'https://source.unsplash.com/random/248x200' }]}
      messageDelay={2000}
    />
  ),
};

export const SystemCardResponse = Template.bind({});
SystemCardResponse.args = {
  children: (
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
      messageDelay={2000}
    />
  ),
};

export const SystemCarouselResponse = Template.bind({});
SystemCarouselResponse.args = {
  children: (
    <SystemResponse
      image="https://source.unsplash.com/random/26x26"
      timestamp={new Date()}
      messages={[
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
      messageDelay={2000}
    />
  ),
};

export const SystemComplexResponse = Template.bind({});
SystemComplexResponse.args = {
  children: (
    <SystemResponse
      image="https://source.unsplash.com/random/26x26"
      timestamp={new Date()}
      messages={[
        { type: 'text', text: 'Lorem ipsum dolor sit' },
        { type: 'text', text: 'Lorem ipsum dolor sit amet consectetur' },
        { type: 'text', text: 'Lorem ipsum dolor sit amet consectetur' },
        { type: 'image', url: 'https://source.unsplash.com/random/248x200' },
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
      messageDelay={2000}
      actions={[{ label: 'Action One' }, { label: 'Action Two' }, { label: 'Action Three' }, { label: 'Action Four' }, { label: 'Action Five' }]}
    />
  ),
};

export const Exhaustive = Template.bind({});
Exhaustive.args = {
  children: (
    <>
      {SystemSimpleResponse.args.children}
      {UserSimpleResponse.args.children}
      {SystemTextResponse.args.children}
      {UserMultilineResponse.args.children}
      {SystemMultipleTextResponse.args.children}
      {UserMultilineResponse.args.children}
      {SystemImageResponse.args.children}
      {UserMultilineResponse.args.children}
      {SystemCardResponse.args.children}
      <UserResponse
        timestamp={new Date()}
        message="Lorem ipsum dolor sit amet"
        debug={{
          message: 'Intent Name (97%)',
          reason: 'Voluptatum quae, accusamus excepturi inventore ex quos veritatis eaque ab non?',
        }}
      />
      {SystemCarouselResponse.args.children}
      {UserMultilineResponse.args.children}
      {SystemComplexResponse.args.children}
      {UserDebugResponse.args.children}
      {SystemActionResponse.args.children}
    </>
  ),
};
