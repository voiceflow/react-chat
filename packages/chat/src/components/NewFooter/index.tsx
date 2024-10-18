import Button from '../Button';
import { ButtonVariant } from '../Button/constants';
import type { IMessageInput } from '../MessageInput';
import { MessageInput } from '../MessageInput';
import {
  footerContainer,
  footerContent,
  messageBackground,
  messageContainer,
  messagePositioner,
  poweredByStyles,
  scrollableButtonContainer,
  scrollToButtomButtonContainer,
  separator,
} from './NewFooter.css';
import { PoweredBy } from './PoweredBy';
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
    <div className={footerContainer}>
      <div className={messageContainer()}>
        <MessageInput {...messageInputProps} />
      </div>
      <div className={messageBackground({ showPoweredBy })}>
        {showPoweredBy && (
          <div className={poweredByStyles}>
            <div>Powered by Voiceflow</div>
            <div className={separator} />
            <div>Privacy</div>
          </div>
        )}
      </div>
    </div>
  );
};

// {showScrollToButton && (
//   <div className={scrollToButtomButtonContainer}>
//     <ScrollButton onClick={onScrollToBottom} />
//   </div>
// )}

// {!!buttons?.length && (
//   <div className={scrollableButtonContainer}>
//     {buttons?.map((button) => (
//       <Button variant={ButtonVariant.INLINE} key={button.label} {...button}>
//         {button.label}
//       </Button>
//     ))}
//   </div>
// )}
