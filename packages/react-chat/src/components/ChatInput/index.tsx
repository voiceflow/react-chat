import cuid from 'cuid';
import { useMemo } from 'react';

import Bubble from '@/components/Bubble';
import type { TextareaProps } from '@/components/Textarea';
import Textarea from '@/components/Textarea';
import type { ChatSpeechRecognitionConfig } from '@/dtos/ChatConfig.dto';
import { createControlled } from '@/utils/controls';

import { AudioInputButton } from './AudioInputButton';
import { useSpeechRecognition } from './hooks';
import { ButtonContainer, Container } from './styled';

export interface ChatInputProps extends TextareaProps {
  /**
   * If true, does not allow the user to submit a response.
   */
  disableSend?: boolean | undefined;

  /**
   * if true, shows audio interface controls.
   */
  audioInterface?: boolean | undefined;

  /**
   * A callback to submit the user response.
   */
  onSend?: VoidFunction;

  /**
   * Custom speech recognition implementation.
   */
  speechRecognition?: ChatSpeechRecognitionConfig;
}

const ChatInput: React.FC<ChatInputProps> = ({
  id,
  onSend,
  placeholder,
  disableSend,
  onValueChange,
  audioInterface,
  speechRecognition: customSpeechRecognition,
  ...props
}) => {
  const internalID = useMemo(() => `vf-chat-input--${cuid()}`, []) ?? id;
  const speechRecognition = useSpeechRecognition({ onSend, onValueChange, customSpeechRecognition });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    event.stopPropagation();

    const { shiftKey } = event;

    if (event.key !== 'Enter') return;
    if (event.key === 'Enter' && !shiftKey) {
      event.preventDefault();
      onSend?.();
    }
  };

  const withSendButton = !!props.value && !disableSend && !speechRecognition.listening;
  const withAudioInput =
    speechRecognition.available && speechRecognition.microphoneAvailable && audioInterface && !withSendButton;

  const getPlaceholder = () => {
    if (speechRecognition.initializing) {
      return 'Initializing...';
    }

    if (speechRecognition.listening) {
      return 'Listening...';
    }

    if (speechRecognition.processing) {
      return 'Processing...';
    }

    return placeholder;
  };

  return (
    <Container>
      <Textarea
        id={internalID}
        ref={speechRecognition.textareaRef}
        readOnly={speechRecognition.initializing || speechRecognition.processing || speechRecognition.listening}
        onKeyDown={handleKeyPress}
        placeholder={getPlaceholder()}
        onValueChange={onValueChange}
        {...props}
      />

      <ButtonContainer htmlFor={internalID} ready={withSendButton}>
        <Bubble size="small" svg="smallArrowUp" onClick={onSend} />
      </ButtonContainer>

      {withAudioInput && (
        <AudioInputButton
          onStop={speechRecognition.stopListening}
          onStart={speechRecognition.startListening}
          listening={speechRecognition.listening}
          processing={speechRecognition.processing}
          initializing={speechRecognition.initializing}
        />
      )}
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
