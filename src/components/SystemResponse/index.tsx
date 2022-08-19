import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Message from '@/components/Message';

import { Actions, Container, List, Spacer, Timestamp } from './styled';
import { formatTime } from './utils';

interface ResponseActionProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ResponseProps {
  image: string;
  timestamp: string;
  messages: string[];
  actions?: ResponseActionProps[];
}

const Response: React.FC<ResponseProps> = ({ image, timestamp, messages, actions = [] }) => (
  <>
    <Container>
      <Avatar image={image} />
      <List>
        {messages.map((message, index) => (
          <Message from="system" key={index}>
            {message}
          </Message>
        ))}
      </List>
      <Spacer />
      <Timestamp>{formatTime(timestamp)}</Timestamp>
    </Container>
    {!!actions.length && (
      <Actions>
        {actions.map(({ label, onClick }, index) => (
          <Button variant="secondary" onClick={onClick} key={index}>
            {label}
          </Button>
        ))}
      </Actions>
    )}
  </>
);

export default Object.assign(Response, {
  Container,
  List,
  Spacer,
  Timestamp,
});
