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
          messages={['Lorem ipsum dolor sit amet consectetur', 'Lorem ipsum dolor sit amet consectetur', 'Lorem ipsum dolor sit amet consectetur']}
        />
        <SystemResponse
          image="https://source.unsplash.com/random/26x26"
          timestamp={new Date().toISOString()}
          messages={['Lorem ipsum dolor sit amet consectetur']}
          actions={[{ label: 'Button One' }, { label: 'Button Two' }, { label: 'Button Three' }]}
        />
      </div>
      <div>
        <UserResponse message="Lorem ipsum dolor sit amet consectetur" />
        <UserResponse message="Lorem ipsum dolor sit amet consectetur" debug={{ message: 'Intent Name (97%)' }} />
      </div>
      <div>
        <Footer />
        <Footer isRunning />
      </div>
      <div>
        <Chat title="Chat Assistant" image="https://source.unsplash.com/random/72x72" description="Lorem ipsum dolor sit amet consectetur" />
        <Chat isRunning title="Chat Assistant" image="https://source.unsplash.com/random/72x72" description="Lorem ipsum dolor sit amet consectetur">
          <SystemResponse
            image="https://source.unsplash.com/random/26x26"
            timestamp={new Date().toISOString()}
            messages={['Lorem ipsum dolor sit amet consectetur', 'Lorem ipsum dolor sit amet consectetur', 'Lorem ipsum dolor sit amet consectetur']}
          />
          <UserResponse message="Lorem ipsum" />
          <SystemResponse
            image="https://source.unsplash.com/random/26x26"
            timestamp={new Date().toISOString()}
            messages={['Lorem ipsum dolor sit']}
          />
          <SystemResponse
            image="https://source.unsplash.com/random/26x26"
            timestamp={new Date().toISOString()}
            messages={['Lorem ipsum dolor sit amet consectetur']}
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
