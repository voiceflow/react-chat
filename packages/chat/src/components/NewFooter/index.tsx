import clsx from 'clsx';

import { ClassName } from '@/constants';

import { Button } from '../Button';
import { ButtonVariant } from '../Button/constants';
import type { IMessageInput } from '../MessageInput';
import { MessageInput } from '../MessageInput';
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
  hasEnded: boolean;
  disableSend?: boolean;

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
          <MessageInput {...messageInputProps} />
        )}
        <div className={footerLinksContainer}>
          {showPoweredBy && (
            <div>
              Powered by{' '}
              <a href={VOICEFLOW_URL} className={voiceflowLink}>
                Voiceflow
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
