import {
  ActionMessage,
  AssistantHeader,
  Avatar,
  Bubble,
  Button,
  Card,
  Chat,
  ChatInput,
  Footer,
  Header,
  Image,
  Input,
  Message,
  Prompt,
  SystemResponse,
  UserResponse,
} from '@/components';

export const Showcase: React.FC = () => {
  return (
    <div>
      <div>
        <Bubble size="small" svg="arrowUp" color="#fff" />
        <Bubble svg="launch" color="#fff" />
      </div>
      <div>
        <Button>Primary Info</Button>
        <Button type="warn">Primary Warn</Button>
        <Button type="subtle">Primary Subtle</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
      <div>
        <Avatar size="small" image="https://source.unsplash.com/random/26x26" />
        <Avatar size="large" image="https://source.unsplash.com/random/72x72" />
      </div>
      <div>
        <Message>Lorem ipsum dolor sit, amet consectetur</Message>
        <Message from="user">Lorem ipsum dolor sit, amet consectetur</Message>
        <Message variant="debug">Lorem ipsum dolor sit, amet consectetur</Message>
        <Message variant="debug" orientation="right">
          Lorem ipsum dolor sit, amet consectetur
        </Message>
      </div>
      <div>
        <ActionMessage orientation="right">Lorem ipsum dolor sit, amet consectetur</ActionMessage>
        <ActionMessage label="Action Label" orientation="right">
          Lorem ipsum dolor sit, amet consectetur
        </ActionMessage>
      </div>
      <div>
        <Input.Controlled placeholder="Message…" />
        <ChatInput.Controlled placeholder="Message…" />
      </div>
      <div>
        <Image image="https://source.unsplash.com/random/248x200" />
      </div>
      <div>
        <Card
          title="Simple Card"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!"
          image="https://source.unsplash.com/random/248x150"
        />
        <Card
          title="Action Card"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!"
          image="https://source.unsplash.com/random/248x150"
          actions={[{ label: 'First Button' }, { label: 'Second Button' }, { label: 'Third Button' }]}
        />
      </div>
      <div>
        <Header title="Chat Assistant" image="https://source.unsplash.com/random/32x32" />
        <Header title="Chat Assistant" image="https://source.unsplash.com/random/32x32" actions={[{ svg: 'minus' }, { svg: 'close' }]} />
      </div>
      <div>
        <AssistantHeader
          name="Chat Assistant"
          description="Lorem ipsum dolor sit amet consectetur"
          image="https://source.unsplash.com/random/72x72"
        />
      </div>
      <div>
        <SystemResponse
          image="https://source.unsplash.com/random/26x26"
          timestamp={new Date().toISOString()}
          messages={[
            { type: 'text', value: 'Lorem ipsum dolor sit amet consectetur' },
            { type: 'text', value: 'Lorem ipsum dolor sit amet consectetur' },
            { type: 'text', value: 'Lorem ipsum dolor sit amet consectetur' },
          ]}
        />
        <SystemResponse
          image="https://source.unsplash.com/random/26x26"
          timestamp={new Date().toISOString()}
          messages={[{ type: 'text', value: 'Lorem ipsum dolor sit amet consectetur' }]}
          actions={[{ label: 'Button One' }, { label: 'Button Two' }, { label: 'Button Three' }]}
        />
        <SystemResponse
          image="https://source.unsplash.com/random/26x26"
          timestamp={new Date().toISOString()}
          messages={[
            {
              type: 'card',
              title: 'Action Card',
              description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
              image: 'https://source.unsplash.com/random/248x150',
            },
          ]}
        />
        <SystemResponse
          image="https://source.unsplash.com/random/26x26"
          timestamp={new Date().toISOString()}
          messages={[
            {
              type: 'card',
              title: 'Action Card',
              description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
              image: 'https://source.unsplash.com/random/248x150',
              actions: [{ label: 'First Button' }, { label: 'Second Button' }, { label: 'Third Button' }],
            },
          ]}
        />
        <SystemResponse
          image="https://source.unsplash.com/random/26x26"
          timestamp={new Date().toISOString()}
          messages={[
            {
              type: 'carousel',
              cards: [
                {
                  title: 'First Card',
                  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
                  image: 'https://source.unsplash.com/random/248x150',
                },
                {
                  title: 'Second Card',
                  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                  image: 'https://source.unsplash.com/random/248x150',
                  actions: [{ label: 'First Button' }, { label: 'Second Button' }],
                },
                {
                  title: 'Third Card',
                  description: 'Lorem ipsum dolor sit amet',
                  image: 'https://source.unsplash.com/random/248x150',
                  actions: [{ label: 'First Button' }, { label: 'Second Button' }, { label: 'Third Button' }],
                },
              ],
            },
          ]}
        />
      </div>
      <div>
        <UserResponse message="Lorem ipsum dolor sit amet consectetur" />
        <UserResponse message="Lorem ipsum dolor sit amet consectetur" debug={{ message: 'Intent Name (97%)' }} />
        <UserResponse
          message="Lorem ipsum dolor sit amet consectetur"
          debug={{
            message: 'Intent Name (97%)',
            reason: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
          }}
        />
        <UserResponse
          message="Lorem ipsum dolor sit amet consectetur"
          debug={{
            message: 'Intent Name (97%)',
            reason: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
            action: { label: 'Add Missing Utterance' },
          }}
        />
      </div>
      <div>
        <Footer />
        <Footer isRunning />
      </div>
      <div>
        <Prompt accept={{ label: 'Accept Option' }} cancel={{ label: 'Cancel Option' }} />
        <Prompt accept={{ label: 'Dangerous Option', type: 'warn' }} cancel={{ label: 'Cancel Option' }} />
      </div>
      <div>
        <Chat title="Chat Assistant" image="https://source.unsplash.com/random/72x72" description="Lorem ipsum dolor sit amet consectetur" />
        <Chat isRunning title="Chat Assistant" image="https://source.unsplash.com/random/72x72" description="Lorem ipsum dolor sit amet consectetur">
          <SystemResponse
            image="https://source.unsplash.com/random/26x26"
            timestamp={new Date().toISOString()}
            messages={[
              { type: 'text', value: 'Lorem ipsum dolor sit amet consectetur' },
              { type: 'text', value: 'Lorem ipsum dolor sit amet consectetur' },
              { type: 'text', value: 'Lorem ipsum dolor sit amet consectetur' },
            ]}
          />
          <UserResponse message="Lorem ipsum" />
          <SystemResponse
            image="https://source.unsplash.com/random/26x26"
            timestamp={new Date().toISOString()}
            messages={[{ type: 'text', value: 'Lorem ipsum dolor sit' }]}
          />
          <UserResponse message="Lorem ipsum dolor sit amet consectetur" debug={{ message: 'Intent Name (97%)' }} />
          <SystemResponse
            image="https://source.unsplash.com/random/26x26"
            timestamp={new Date().toISOString()}
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
            message="Lorem ipsum dolor sit amet consectetur"
            debug={{
              message: 'Intent Name (97%)',
              reason: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
            }}
          />
          <SystemResponse
            image="https://source.unsplash.com/random/26x26"
            timestamp={new Date().toISOString()}
            messages={[
              {
                type: 'card',
                title: 'Action Card',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
                image: 'https://source.unsplash.com/random/248x150',
                actions: [{ label: 'First Button' }, { label: 'Second Button' }, { label: 'Third Button' }],
              },
            ]}
          />
          <SystemResponse
            image="https://source.unsplash.com/random/26x26"
            timestamp={new Date().toISOString()}
            messages={[
              {
                type: 'carousel',
                cards: [
                  {
                    title: 'Third Card',
                    description: 'Lorem ipsum dolor sit amet',
                    image: 'https://source.unsplash.com/random/248x150',
                    actions: [{ label: 'First Button' }, { label: 'Second Button' }, { label: 'Third Button' }],
                  },
                  {
                    title: 'First Card',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
                    image: 'https://source.unsplash.com/random/248x150',
                  },
                  {
                    title: 'Second Card',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    image: 'https://source.unsplash.com/random/248x150',
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
              reason: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
              action: { label: 'Debug Action' },
            }}
          />
          <SystemResponse
            image="https://source.unsplash.com/random/26x26"
            timestamp={new Date().toISOString()}
            messages={[{ type: 'text', value: 'Lorem ipsum dolor sit' }]}
          />
          <SystemResponse
            image="https://source.unsplash.com/random/26x26"
            timestamp={new Date().toISOString()}
            messages={[{ type: 'text', value: 'Lorem ipsum dolor sit amet consectetur' }]}
            actions={[
              { label: 'Action One' },
              { label: 'Action Two' },
              { label: 'Action Three' },
              { label: 'Action Four' },
              { label: 'Action Five' },
            ]}
          />
        </Chat>
      </div>
    </div>
  );
};
