/* eslint-disable jsx-a11y/no-autofocus */
import cuid from 'cuid';
import { useMemo, useRef } from 'react';

import Bubble from '@/components/Bubble';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Textarea, { TextareaProps } from '@/components/Textarea';
import { createControlled } from '@/utils/controls';

import { ButtonContainer, InputBarContainer, InputContainer } from './styled';

export interface ChatInputProps extends TextareaProps {
  /**
   * If true, does not allow the user to submit a response.
   */
  disableSend?: boolean | undefined;

  /**
   * A callback to submit the user response.
   */
  onSend?: VoidFunction;

  listening: boolean;

  onStopListening: VoidFunction;

  onStartListening: VoidFunction;
}

const ChatInput: React.FC<ChatInputProps> = ({ id, onSend, disableSend, listening, onStartListening, onStopListening, ...props }) => {
  const internalID = useMemo(() => `vf-chat-input--${cuid()}`, []) ?? id;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    const { shiftKey } = event;

    if (event.key !== 'Enter') return;
    if (event.key === 'Enter' && !shiftKey) {
      event.preventDefault();
      onSend?.();
    }
  };

  const stopListeningHandler = async () => {
    textareaRef.current?.focus();
    onStopListening();
  };

  return (
    <InputBarContainer>
      <InputContainer>
        <Textarea
          ref={textareaRef}
          id={internalID}
          disabled={listening}
          onKeyDown={handleKeyPress}
          {...props}
          placeholder={listening ? 'Listening...' : 'Message...'}
        />
        <ButtonContainer htmlFor={internalID}>
          {listening ? (
            <Button.Tertiary onClick={stopListeningHandler} autoFocus onKeyDown={handleKeyPress}>
              <Icon svg="stop" style={{ color: '#C62445' }} />
            </Button.Tertiary>
          ) : (
            <Button.Secondary onClick={onStartListening}>
              <Icon svg="microphone" />
            </Button.Secondary>
          )}
        </ButtonContainer>
      </InputContainer>
      <Bubble size="small" svg="smallArrowUp" disabled={!props.value || !!disableSend} onClick={onSend} />
    </InputBarContainer>
  );
};

/**
 * An input control with a built-in submit button.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-chat-chatinput--default}
 */
export default Object.assign(ChatInput, {
  Controlled: createControlled(ChatInput, {
    defaultValue: '',
    enrichProps: (props, [, setValue]) => ({
      ...props,
      onSend: (): void => {
        setValue('');
        props.onSend?.();
      },
    }),
  }),
  ButtonContainer,
});
