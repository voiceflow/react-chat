import clsx from 'clsx';
import { useContext, useMemo, useRef, useState } from 'react';

import { ClassName } from '@/constants';
import { AutoScrollProvider, RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts';
import { RenderMode } from '@/dtos/RenderOptions.dto';
import type { Nullish } from '@/types';
import { chain } from '@/utils/functional';

import mockAvatar from '../../assets/blank-image.png';
import { ButtonVariant } from '../Button/constants';
import { Header, type HeaderActionProps, type HeaderProps } from '../Header';
import { type INewFooter, NewFooter } from '../NewFooter';
import { Prompt } from '../Prompt';
import { ScrollToBottom } from '../ScrollToBottom';
import { type IWelcomeMessage, WelcomeMessage } from '../WelcomeMessage';
import { bottomSpacer, chatContainer, dialogContainer } from './NewChat.css';

export interface INewChat extends HeaderProps, IWelcomeMessage, INewFooter, React.PropsWithChildren<unknown> {
  /**
   * If true, shows a loading indicator.
   */
  isLoading: boolean;

  /**
   * If true, shows audio interface controls.
   */
  audioInterface?: boolean;

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
}

export const NewChat: React.FC<INewChat> = ({
  buttons,
  showPoweredBy,
  messageInputProps,
  title,
  description,
  avatar,
  hasEnded,
  onSend,
  onStart,
  onMinimize,
  onEnd,
  extraLinkText,
  extraLinkUrl,
  children,
  audioInterface,
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

  const handleResume = (): void => setAlert(false);

  const headerActions = useMemo<HeaderActionProps[]>(() => {
    const items: HeaderActionProps[] = [{ svg: 'close', onClick: handleClose }];

    if (config.render?.mode === RenderMode.OVERLAY) {
      items.unshift({ svg: 'minus', onClick: onMinimize });
    }

    if (audioInterface) {
      items.unshift({
        svg: state.audioOutput ? 'sound' : 'soundOff',
        onClick: toggleAudioOutput,
      });
    }

    return items;
  }, [config.render, handleClose, onMinimize, state.audioOutput, audioInterface]);

  const scrollableAreaRef = useRef<HTMLDivElement>(null);

  return (
    <div className={clsx(ClassName.CHAT, chatContainer)}>
      <Header title={title} image={mockAvatar} actions={headerActions} />
      <div ref={scrollableAreaRef} className={dialogContainer}>
        <AutoScrollProvider target={scrollableAreaRef}>
          <WelcomeMessage title={title} description={description} avatar={avatar} />
          {children}
          <div className={bottomSpacer} />
        </AutoScrollProvider>
      </div>
      <ScrollToBottom scrollableAreaRef={scrollableAreaRef} />
      <NewFooter
        buttons={buttons}
        showPoweredBy={showPoweredBy}
        onSend={onSend}
        onStart={onStart}
        hasEnded={hasEnded}
        extraLinkText={extraLinkText}
        extraLinkUrl={extraLinkUrl}
        messageInputProps={{ ...messageInputProps, disableSend: state.indicator }}
      />
      <Prompt
        visible={hasAlert}
        accept={{ label: 'End Chat', variant: ButtonVariant.WARN, onClick: chain(onEnd, handleResume) }}
        cancel={{ label: 'Cancel', onClick: handleResume }}
      />
    </div>
  );
};
