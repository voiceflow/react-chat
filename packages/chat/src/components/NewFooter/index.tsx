import Button from '../Button';
import { ButtonVariant } from '../Button/constants';
import type { IMessageInput } from '../MessageInput';
import { MessageInput } from '../MessageInput';
import {
  buttonsContainer,
  footerContainer,
  messageBackground,
  messageContainer,
  poweredByStyles,
  separator,
} from './NewFooter.css';

export interface INewFooter {
  buttons?: { label: string; onClick: () => void }[];

  showPoweredBy?: boolean;
  messageInputProps: IMessageInput;
}

export const NewFooter: React.FC<INewFooter> = ({
  buttons,

  showPoweredBy,
  messageInputProps,
}) => {
  return (
    <div className={footerContainer}>
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
