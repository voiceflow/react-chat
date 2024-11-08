import clsx from 'clsx';
import type { RefObject } from 'react';

import { ClassName } from '@/constants';

import { Button } from '../Button';
import { ButtonVariant } from '../Button/constants';
import type { IMessageInput } from '../MessageInput';
import { MessageInput } from '../MessageInput';
import { ScrollToBottom } from '../ScrollToBottom';
import {
  buttonsContainer,
  extraLinkStyles,
  footerContainer,
  footerLinksContainer,
  messageContainer,
  separator,
} from './NewFooter.css';

export interface INewFooter {
  buttons?: { label: string; onClick: () => void }[];
  showPoweredBy?: boolean;
  messageInputProps: IMessageInput;
  extraLinkText?: string;
  extraLinkUrl?: string;
  hasEnded: boolean;
  disableSend?: boolean;
  scrollableAreaRef: RefObject<HTMLDivElement>;

  /**
   * A callback to start a new conversation.
   */
  onStart?: (() => Promise<void>) | undefined;

  /**
   * A callback to submit a user response.
   */
  onSend?: ((message: string) => Promise<void>) | undefined;
}

export const NewFooter: React.FC<INewFooter> = ({
  buttons,
  showPoweredBy,
  messageInputProps,
  extraLinkText,
  extraLinkUrl,
  hasEnded,
  onStart,
  scrollableAreaRef,
}) => {
  const showExtraLink = extraLinkText && extraLinkUrl;
  return (
    <div className={clsx(ClassName.FOOTER, footerContainer)}>
      {(buttons?.length ?? 0) > 0 && (
        <div className={buttonsContainer}>
          {buttons?.map((button) => (
            <Button variant={ButtonVariant.INLINE} key={button.label} {...button}>
              {button.label}
            </Button>
          ))}
        </div>
      )}

      <div className={messageContainer()}>
        {hasEnded ? (
          <Button onClick={onStart} large>
            Start New Chat
          </Button>
        ) : (
          <>
            <ScrollToBottom scrollableAreaRef={scrollableAreaRef} />
            <MessageInput {...messageInputProps} />
          </>
        )}
        <div className={footerLinksContainer}>
          {showPoweredBy && <div>Powered by Voiceflow</div>}
          {showPoweredBy && showExtraLink && <div className={separator} />}
          {showExtraLink && (
            <a href={extraLinkUrl} target="_blank" className={extraLinkStyles}>
              {extraLinkText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
