import clsx from 'clsx';

import { ClassName } from '@/constants';

import { Button } from '../Button';
import { ButtonVariant } from '../Button/constants';
import type { IMessageInput } from '../MessageInput';
import { MessageInput } from '../MessageInput';
import {
  buttonsContainer,
  footerContainer,
  inputContainer,
  messageContainer,
  poweredByStyles,
  prviacyLinkStyles,
  separator,
} from './NewFooter.css';

export interface INewFooter {
  buttons?: { label: string; onClick: () => void }[];
  showPoweredBy?: boolean;
  messageInputProps: IMessageInput;
  privacyURL?: string;
}

export const NewFooter: React.FC<INewFooter> = ({ buttons, showPoweredBy, messageInputProps, privacyURL }) => {
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
      <div className={messageContainer({ showPoweredBy })}>
        <div className={inputContainer}>
          <MessageInput {...messageInputProps} />
        </div>
        {showPoweredBy && (
          <div className={poweredByStyles}>
            <div>Powered by Voiceflow</div>
            <div className={separator} />
            <a href={privacyURL} target="_blank" className={prviacyLinkStyles}>
              Privacy
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
