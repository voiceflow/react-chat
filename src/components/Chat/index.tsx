import { useState } from 'react';

import AssistantHeader from '@/components/AssistantHeader';
import Footer, { FooterProps } from '@/components/Footer';
import Header, { HeaderProps } from '@/components/Header';
import Prompt from '@/components/Prompt';
import { chain } from '@/utils/functional';

import { Container, Dialog, Overlay } from './styled';

export interface ChatProps extends HeaderProps, FooterProps, React.PropsWithChildren {
  description: string;
  onMinimize?: React.MouseEventHandler<HTMLButtonElement>;
  onEnd?: React.MouseEventHandler<HTMLButtonElement>;
}

const Chat: React.FC<ChatProps> = ({ isRunning, title, image, description, onMinimize, onEnd, onStart, onSend, children }) => {
  const [hasAlert, setAlert] = useState(false);

  const handleClose = () => setAlert(true);
  const handleResume = () => setAlert(false);

  return (
    <Container>
      <Header
        title={title}
        image={image}
        actions={[
          { svg: 'minus', onClick: onMinimize },
          { svg: 'close', onClick: handleClose },
        ]}
      />
      <AssistantHeader name={title} image={image} description={description} />
      <Dialog>{children}</Dialog>
      <Footer isRunning={isRunning} onStart={onStart} onSend={onSend} />
      {hasAlert && (
        <>
          <Overlay />
          <Prompt
            accept={{ label: 'End Chat', type: 'warn', onClick: chain(onEnd, handleResume) }}
            cancel={{ label: 'Cancel', onClick: handleResume }}
          />
        </>
      )}
    </Container>
  );
};

export default Object.assign(Chat, {
  Container,
  Dialog,
  Overlay,
});
