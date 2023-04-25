import React, { memo, useRef, useState } from 'react';

import AssistantInfo, { AssistantInfoProps } from '@/components/AssistantInfo';
import Footer, { FooterProps } from '@/components/Footer';
import Header, { HeaderProps } from '@/components/Header';
import Loader from '@/components/Loader';
import Prompt from '@/components/Prompt';
import { AutoScrollProvider } from '@/contexts';
import { Nullish } from '@/types';
import { chain } from '@/utils/functional';

import { useTimestamp } from './hooks';
import { Container, Dialog, Overlay, SessionTime, Spacer, Status } from './styled';

export interface ChatProps extends HeaderProps, AssistantInfoProps, FooterProps, React.PropsWithChildren<unknown> {
  /**
   * A short description of the assistant to help frame the conversation.
   */
  description: string;

  /**
   * If true, shows a loading indicator.
   */
  isLoading: boolean;

  /**
   * A unix timestamp indicating the start of the conversation.
   */
  startTime?: Nullish<number>;

  /**
   * If true, a Voiceflow watermark is added to the footer.
   */
  withWatermark: boolean;

  /**
   * A callback that is executed when the chat widget is minimized.
   */
  onMinimize?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * A callback that is executed when the conversation ends.
   */
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
  withWatermark,
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
      <Footer withWatermark={withWatermark} hasEnded={hasEnded} onStart={onStart} onSend={onSend} />
      <Overlay />
      <Prompt accept={{ label: 'End Chat', type: 'warn', onClick: chain(onEnd, handleResume) }} cancel={{ label: 'Cancel', onClick: handleResume }} />
    </Container>
  );
};

/**
 * A full chat dialog with header, footer, overlay and auto-scrolling content.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/templates-chat--empty}
 */
export default Object.assign(memo(Chat), {
  Container,
  Dialog,
  Overlay,
  Spacer,
  Status,
});
