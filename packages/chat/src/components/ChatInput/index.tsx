import cuid from 'cuid';
import { useMemo, useRef } from 'react';

import Bubble from '@/components/Bubble';
import type { TextareaProps } from '@/components/Textarea';
import Textarea from '@/components/Textarea';
import { createControlled } from '@/utils/controls';

import { ButtonContainer, Container } from './styled';

export interface ChatInputProps extends TextareaProps {
  /**
   * If true, does not allow the user to submit a response.
   */
  disableSend?: boolean | undefined;

  /**
   * A callback to submit the user response.
   */
  onSend?: VoidFunction;
}

const ChatInput: React.FC<ChatInputProps> = ({ id, onSend, disableSend, ...props }) => {
  const internalID = useMemo(() => `vf-chat-input--${cuid()}`, []) ?? id;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    event.stopPropagation();
    const { shiftKey } = event;

    if (event.key !== 'Enter') return;
    if (event.key === 'Enter' && !shiftKey) {
      event.preventDefault();
      onSend?.();
    }
  };

  return (
    <Container>
      <Textarea ref={textareaRef} id={internalID} onKeyDown={handleKeyPress} {...props} />
      <ButtonContainer htmlFor={internalID} ready={!!props.value && !disableSend}>
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
