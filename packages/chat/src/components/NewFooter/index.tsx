import clsx from 'clsx';
import type { RefObject } from 'react';

import { ClassName } from '@/constants';

import { Button } from '../Button';
import { ButtonVariant } from '../Button/constants';
import type { IMessageInput } from '../MessageInput';
import { MessageInput } from '../MessageInput';
import { promptContainer } from '../Prompt/styles.css';
import { ScrollToBottom } from '../ScrollToBottom';
import { BottomLinks } from './BottomLinks';
import { buttonsContainer, footerContainer, hasEnded, messageContainer } from './NewFooter.css';

export interface INewFooter {
  buttons?: { label: string; onClick: () => void }[];
  showPoweredBy?: boolean;
  messageInputProps: IMessageInput;
  extraLinkText?: string;
  extraLinkUrl?: string;
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
        <ScrollToBottom
          scrollableAreaRef={scrollableAreaRef}
          className={clsx(messageInputProps.hasEnded ? hasEnded : '')}
        />
        <MessageInput {...messageInputProps} />
        <BottomLinks extraLinkText={extraLinkText} extraLinkUrl={extraLinkUrl} showPoweredBy={showPoweredBy} />
      </div>
    </div>
  );
};
