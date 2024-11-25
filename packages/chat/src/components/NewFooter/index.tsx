import clsx from 'clsx';
import type { RefObject } from 'react';

import { ClassName } from '@/constants';

import { Button } from '../Button';
import { ButtonVariant } from '../Button/constants';
import type { IMessageInput } from '../MessageInput';
import { MessageInput } from '../MessageInput';
import { promptContainer } from '../Prompt/styles.css';
import { ScrollToBottom } from '../ScrollToBottom';
import {
  buttonsContainer,
  extraLinkStyles,
  footerContainer,
  footerLinksContainer,
  messageContainer,
  separator,
  voiceflowLink,
} from './NewFooter.css';

const VOICEFLOW_URL = 'https://www.voiceflow.com/';

export interface INewFooter {
  buttons?: { label: string; onClick: () => void }[];
  showPoweredBy?: boolean;
  messageInputProps: IMessageInput;
  extraLinkText?: string;
  extraLinkUrl?: string;
  disableSend?: boolean;
  scrollableAreaRef: RefObject<HTMLDivElement>;

  /**
   * A callback to submit a user response.
   */
  onSend?: ((message: string) => Promise<void>) | undefined;

  /**
   * A callback to start a new conversation.
   */
  onStart?: (() => Promise<void>) | undefined;
}

export const NewFooter: React.FC<INewFooter> = ({
  buttons,
  showPoweredBy,
  messageInputProps,
  extraLinkText,
  extraLinkUrl,
  scrollableAreaRef,
  onStart,
}) => {
  const showExtraLink = extraLinkText && extraLinkUrl;
  return (
    <div className={clsx(ClassName.FOOTER, footerContainer)}>
      <div className={promptContainer({ visible: messageInputProps.hasEnded })}>
        <Button variant={ButtonVariant.PRIMARY} large="true" onClick={onStart}>
          Start new chat
        </Button>
      </div>

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
        <ScrollToBottom scrollableAreaRef={scrollableAreaRef} />
        <MessageInput {...messageInputProps} />
        <div className={footerLinksContainer}>
          {showPoweredBy && (
            <div>
              <a href={VOICEFLOW_URL} target="_blank" rel="noreferrer" className={voiceflowLink}>
                Powered by Voiceflow
              </a>
            </div>
          )}
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
