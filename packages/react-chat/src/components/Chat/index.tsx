import React, { memo, useRef, useState } from 'react';

import AssistantInfo, { AssistantHeaderProps } from '@/components/AssistantInfo';
import Footer, { FooterProps } from '@/components/Footer';
import Header, { HeaderProps } from '@/components/Header';
import Loader from '@/components/Loader';
import Prompt from '@/components/Prompt';
import { AutoScrollProvider } from '@/contexts';
import { Nullish } from '@/types';
import { chain } from '@/utils/functional';

import { useTimestamp } from './hooks';
import { Container, Dialog, Overlay, SessionTime, Spacer, Status } from './styled';

export interface ChatProps extends HeaderProps, AssistantHeaderProps, FooterProps, React.PropsWithChildren<unknown> {
  description: string;
  isLoading: boolean;
  startTime?: Nullish<Date>;
  watermark: boolean;
  onMinimize?: React.MouseEventHandler<HTMLButtonElement>;
  onEnd?: React.MouseEventHandler<HTMLButtonElement>;
}

const Chat: React.FC<ChatProps> = ({
  hasEnded,
  title,
  image,
  avatar,
  description,
  startTime,
  isLoading,
  watermark,
  onMinimize,
  onEnd,
  onStart,
  onSend,
  children,
}) => {
  const timestamp = useTimestamp(startTime);
  const dialogRef = useRef<HTMLElement>(null);
  const [hasAlert, setAlert] = useState(false);

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (hasEnded) {
      onEnd?.(event);
    } else {
      setAlert(true);
    }
  };
  const handleResume = (): void => setAlert(false);

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <Container withPrompt={hasAlert}>
      <Header
        title={title}
        image={image}
        actions={[
          { svg: 'minus', onClick: onMinimize },
          { svg: 'close', onClick: handleClose },
        ]}
      />
      <Dialog ref={dialogRef}>
        <AutoScrollProvider target={dialogRef}>
          <AssistantInfo title={title} avatar={avatar} description={description} />
          <Spacer />
          {!!timestamp && <SessionTime>{timestamp}</SessionTime>}
          {children}
          {hasEnded && <Status>You have ended the chat</Status>}
        </AutoScrollProvider>
      </Dialog>
      <Footer watermark={watermark} hasEnded={hasEnded} onStart={onStart} onSend={onSend} />
      <Overlay />
      <Prompt accept={{ label: 'End Chat', type: 'warn', onClick: chain(onEnd, handleResume) }} cancel={{ label: 'Cancel', onClick: handleResume }} />
    </Container>
  );
};

export default Object.assign(memo(Chat), {
  Container,
  Dialog,
  Overlay,
  Spacer,
  Status,
});
