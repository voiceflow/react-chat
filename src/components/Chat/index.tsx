import AssistantHeader from '@/components/AssistantHeader';
import Footer, { FooterProps } from '@/components/Footer';
import Header, { HeaderProps } from '@/components/Header';

import { Container, Dialog } from './styled';

export interface ChatProps extends HeaderProps, FooterProps, React.PropsWithChildren {
  description: string;
  onMinimize?: React.MouseEventHandler<HTMLButtonElement>;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const Chat: React.FC<ChatProps> = ({ isRunning, title, image, description, onMinimize, onClose, onStart, onSend, children }) => (
  <Container>
    <Header
      title={title}
      image={image}
      actions={[
        { svg: 'minus', onClick: onMinimize },
        { svg: 'close', onClick: onClose },
      ]}
    />
    <AssistantHeader name={title} image={image} description={description} />
    <Dialog>{children}</Dialog>
    <Footer isRunning={isRunning} onStart={onStart} onSend={onSend} />
  </Container>
);

export default Object.assign(Chat, {
  Container,
  Dialog,
});
