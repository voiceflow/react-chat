import cuid from 'cuid';
import { useMemo, useRef } from 'react';

import { Textarea } from '@/components';
import Bubble from '@/components/Bubble';
import { createControlled } from '@/utils/controls';

import { TextareaProps } from '../Textarea';
import { ButtonContainer, Container } from './styled';

export interface ChatInputProps extends TextareaProps {
  /**
   * If true, does not allow the user to submit a response.
   */
  buffering?: boolean;

  /**
   * A callback to submit the user response.
   */
  onSend?: VoidFunction;
}

const ChatInput: React.FC<ChatInputProps> = ({ id, onSend, buffering, ...props }) => {
  const internalID = useMemo(() => `vf-chat-input--${cuid()}`, []) ?? id;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    event.stopPropagation();
    const { shiftKey } = event;

    if (event.key !== 'Enter') return;
    if (event.key === 'Enter' && shiftKey) {
      event.preventDefault();
      const input = event.target;

      const { selectionStart, selectionEnd, value } = input as EventTarget & { selectionStart: number; selectionEnd: number; value: string };
      const newValue = `${value.substring(0, selectionStart)} \n${value.substring(selectionEnd)}`;
      props.onValueChange?.(newValue);

      if (!textareaRef?.current) return;
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      textareaRef?.current?.setSelectionRange(value.length, value.length);
    } else {
      event.preventDefault();
      onSend?.();
    }
  };

  return (
    <Container>
      <Textarea ref={textareaRef} id={internalID} onKeyDown={handleKeyPress} {...props} />
      <ButtonContainer htmlFor={internalID} ready={!!props.value && !buffering}>
        <Bubble size="small" svg="smallArrowUp" onClick={onSend} />
      </ButtonContainer>
    </Container>
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
  Container,
  ButtonContainer,
});
