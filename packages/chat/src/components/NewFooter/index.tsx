import Button from '../Button';
import { ButtonVariant } from '../Button/constants';
import { MessageInput } from '../MessageInput';
import {
  footerContainer,
  messageContainer,
  scrollableButtonContainer,
  scrollToButtomButtonContainer,
} from './NewFooter.css';
import { PoweredBy } from './PoweredBy';
import { ScrollButton } from './ScrollButton';

interface INewFooter {
  buttons: { label: string; onClick: () => void }[];
  showScrollToButton?: boolean;
  showPoweredBy?: boolean;
}

export const NewFooter: React.FC<INewFooter> = ({ buttons, showScrollToButton, showPoweredBy }) => {
  return (
    <div className={footerContainer}>
      {showScrollToButton && (
        <div className={scrollToButtomButtonContainer}>
          <ScrollButton />
        </div>
      )}
      {buttons?.length && (
        <div className={scrollableButtonContainer}>
          {buttons?.map((button) => (
            <Button variant={ButtonVariant.INLINE} key={button.label} {...button}>
              {button.label}
            </Button>
          ))}
        </div>
      )}
      <div className={messageContainer({ showPoweredBy: !!showPoweredBy })}>
        <MessageInput onValueChange={() => null} message="" placeholder="Message..." onSubmit={() => null} />
      </div>
      {showPoweredBy && <PoweredBy />}
    </div>
  );
};
