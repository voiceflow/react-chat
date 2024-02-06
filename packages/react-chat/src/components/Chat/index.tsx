import React, { memo, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { RenderMode } from '@/common';
import AssistantInfo, { AssistantInfoProps } from '@/components/AssistantInfo';
import Footer, { FooterProps } from '@/components/Footer';
import Header, { HeaderProps } from '@/components/Header';
import Loader from '@/components/Loader';
import Prompt from '@/components/Prompt';
import { AutoScrollProvider, RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts';
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
   * If true, the chat messages are shown, and the session is active.
   */
  autostart?: boolean;

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
  autostart,
  onMinimize,
  onEnd,
  onStart,
  onSend,
  children,
}) => {
  const timestamp = useTimestamp(startTime);
  const dialogRef = useRef<HTMLElement>(null);
  const [hasAlert, setAlert] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  useLayoutEffect(() => {
    if (!initialRender) return;

    setInitialRender(false);
  }, [initialRender]);

  const { config } = useContext(RuntimeStateAPIContext);

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (hasEnded) {
      onEnd?.(event);
    } else {
      setAlert(true);
    }
  };

  const handleResume = (): void => setAlert(false);

  const actions = useMemo(() => {
    if (config.render?.mode === RenderMode.BUBBLE) {
      return [
        { svg: 'minus', onClick: onMinimize },
        { svg: 'close', onClick: handleClose },
      ];
    }
    return [{ svg: 'close', onClick: handleClose }];
  }, [config, handleClose, onMinimize]);

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (!autostart && initialRender) {
    console.log('initial render');
    return (
      <Container withPrompt={hasAlert}>
        <Header title={title} image={image} actions={actions} />
        <Dialog ref={dialogRef}>
          <AutoScrollProvider target={dialogRef}>
            <AssistantInfo title={title} avatar={avatar} description={description} />
          </AutoScrollProvider>
        </Dialog>
        <Footer withWatermark={withWatermark} hasEnded={hasEnded} onStart={onStart} onSend={onSend} />
        <Overlay />
        <Prompt
          accept={{ label: 'End Chat', type: 'warn', onClick: chain(onEnd, handleResume) }}
          cancel={{ label: 'Cancel', onClick: handleResume }}
        />
      </Container>
    );
  }

  return (
    <Container withPrompt={hasAlert}>
      <Header title={title} image={image} actions={actions} />
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
