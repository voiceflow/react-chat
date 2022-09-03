import { Children, memo, useState } from 'react';

import AssistantInfo from '@/components/AssistantInfo';
import Footer, { FooterProps } from '@/components/Footer';
import Header, { HeaderProps } from '@/components/Header';
import Prompt from '@/components/Prompt';
import { useAutoScroll } from '@/hooks';
import { chain } from '@/utils/functional';

import { useTimestamp } from './hooks';
import { Container, Dialog, Overlay, Spacer, Timestamp } from './styled';

export interface ChatProps extends HeaderProps, FooterProps, React.PropsWithChildren {
  description: string;
  startTime: Date;
  onMinimize?: React.MouseEventHandler<HTMLButtonElement>;
  onEnd?: React.MouseEventHandler<HTMLButtonElement>;
}

const Chat: React.FC<ChatProps> = ({ isRunning, title, image, description, startTime, onMinimize, onEnd, onStart, onSend, children }) => {
  const timestamp = useTimestamp(startTime);
  const dialogRef = useAutoScroll([Children.count(children)]);
  const [hasAlert, setAlert] = useState(false);

  const handleClose = (): void => setAlert(true);
  const handleResume = (): void => setAlert(false);

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
      <Dialog ref={dialogRef}>
        <AssistantInfo name={title} image={image} description={description} />
        <Spacer />
        <Timestamp>{timestamp}</Timestamp>
        {children}
      </Dialog>
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

export default Object.assign(memo(Chat), {
  Container,
  Dialog,
  Overlay,
  Spacer,
  Timestamp,
});
