import Button from '../Button';
import { ButtonVariant } from '../Button/constants';
import type { IMessageInput } from '../MessageInput';
import { MessageInput } from '../MessageInput';
import {
  buttonsContainer,
  messageBackground,
  messageContainer,
  poweredByStyles,
  scrollButtonContainer,
  separator,
} from './NewFooter.css';
import { ScrollButton } from './ScrollButton';

export interface INewFooter {
  buttons?: { label: string; onClick: () => void }[];
  showScrollToButton?: boolean;
  onScrollToBottom?: () => void;
  showPoweredBy?: boolean;
  messageInputProps: IMessageInput;
}

export const NewFooter: React.FC<INewFooter> = ({
  buttons,
  showScrollToButton,
  onScrollToBottom,
  showPoweredBy,
  messageInputProps,
}) => {
  return (
    <div>
      {showScrollToButton && (
        <div className={scrollButtonContainer}>
          <ScrollButton onClick={onScrollToBottom} />
        </div>
      )}
      {(buttons?.length ?? 0) > 0 && (
        <div className={buttonsContainer}>
          {buttons?.map((button) => (
            <Button variant={ButtonVariant.INLINE} key={button.label} {...button}>
              {button.label}
            </Button>
          ))}
        </div>
      )}
      <div className={messageContainer}>
        <MessageInput {...messageInputProps} />
        <div className={messageBackground({ showPoweredBy })} />
      </div>
      {showPoweredBy && (
        <div className={poweredByStyles}>
          <div>Powered by Voiceflow</div>
          <div className={separator} />
          <div>Privacy</div>
        </div>
      )}
    </div>
  );
};
