import clsx from 'clsx';
import { useContext, useMemo, useRef, useState } from 'react';

import { ClassName } from '@/constants';
import { AutoScrollProvider, RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts';
import type { Nullish } from '@/types';
import { chain } from '@/utils/functional';

import { Header, type HeaderActionProps, type HeaderProps } from '../Header';
import { type INewFooter, NewFooter } from '../NewFooter';
import { Prompt } from '../Prompt';
import { Separator } from '../Separator';
import { type IWelcomeMessage, WelcomeMessage } from '../WelcomeMessage';
import { bottomSpacer, chatContainer, dialogContainer } from './NewChat.css';

export interface INewChat
  extends HeaderProps,
    IWelcomeMessage,
    Omit<INewFooter, 'scrollableAreaRef'>,
    React.PropsWithChildren<unknown> {
  /**
   * If true, shows a loading indicator.
   */
  isLoading: boolean;

  /**
   * If true, shows audio interface controls.
   */
  audioInterface?: boolean;

  /**
   * If true, the user is using a mobile device.
   */
  isMobile?: boolean;

  /**
   * A unix timestamp indicating the start of the conversation.
   */
  startTime?: Nullish<number>;

  /**
   * A callback that is executed when the chat widget is minimized.
   */
  onMinimize?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * A callback that is executed when the conversation ends.
   */
  onEnd?: React.MouseEventHandler<HTMLButtonElement>;

  hasEnded: boolean;

  /**
   * A callback to start a new conversation.
   */
  onStart?: (() => Promise<void>) | undefined;
}

export const NewChat: React.FC<INewChat> = ({
  buttons,
  showPoweredBy,
  messageInputProps,
  title,
  description,
  avatar,
  hasEnded,
  onStart,
  onMinimize,
  onEnd,
  extraLinkText,
  extraLinkUrl,
  children,
  audioInterface,
  isMobile,
}) => {
  const [hasAlert, setAlert] = useState(false);

  const { config, toggleAudioOutput } = useContext(RuntimeStateAPIContext);
  const state = useContext(RuntimeStateContext);

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (hasEnded) {
      onEnd?.(event);
    } else {
      setAlert(true);
    }
  };

  const handleResume = (_: any): void => setAlert(false);

  const headerActions = useMemo<HeaderActionProps[]>(() => {
    const items: HeaderActionProps[] = [{ svg: 'reset', onClick: handleClose }];
    if (isMobile) {
      items.push({ svg: 'close', onClick: onMinimize });
    }

    if (audioInterface) {
      items.unshift({
        svg: state.audioOutput ? 'volume' : 'mute',
        onClick: toggleAudioOutput,
      });
    }

    return items;
  }, [config.render, handleClose, onMinimize, state.audioOutput, audioInterface]);

  const scrollableAreaRef = useRef<HTMLDivElement>(null);

  return (
    <div className={clsx(ClassName.CHAT, chatContainer({ mobile: isMobile }))}>
      <Header title={title} image={avatar} actions={headerActions} />
      <div ref={scrollableAreaRef} className={dialogContainer}>
        <AutoScrollProvider target={scrollableAreaRef}>
          <WelcomeMessage title={title} description={description} avatar={avatar} />
          {children}
          {hasEnded && !!state.session.turns.length && <Separator text="Chat has ended" />}
          <div className={bottomSpacer} />
        </AutoScrollProvider>
      </div>
      <NewFooter
        buttons={buttons}
        showPoweredBy={showPoweredBy}
        extraLinkText={extraLinkText}
        extraLinkUrl={extraLinkUrl}
        messageInputProps={{ ...messageInputProps, disableSend: state.indicator, hasEnded }}
        scrollableAreaRef={scrollableAreaRef}
      />
      <Prompt
        visible={hasAlert || hasEnded}
        showOverlay={hasAlert && !hasEnded}
        accept={{ label: 'Start new chat', onClick: chain(handleResume, onEnd, onStart) }}
        cancel={hasEnded ? undefined : { label: 'Cancel', onClick: handleResume }}
      />
    </div>
  );
};
