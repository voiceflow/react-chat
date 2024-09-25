import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactSpeechRecognition, { useSpeechRecognition as useReactSpeechRecognition } from 'react-speech-recognition';

import type { ChatSpeechRecognitionConfig, ChatSpeechRecognitionState } from '@/dtos/ChatConfig.dto';

export const useSpeechRecognition = ({
  onSend,
  onValueChange,
  customSpeechRecognition,
}: {
  onSend?: () => void;
  onValueChange: (value: string) => void;
  customSpeechRecognition?: ChatSpeechRecognitionConfig;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const reactSpeechRecognition = useReactSpeechRecognition({ clearTranscriptOnListen: true });

  const customSpeechRecognitionEnabled =
    !!customSpeechRecognition &&
    (customSpeechRecognition.overrideNative || !reactSpeechRecognition.browserSupportsSpeechRecognition);

  const prevListening = useRef(
    customSpeechRecognitionEnabled ? customSpeechRecognition.initialState.listening : reactSpeechRecognition.listening
  );
  const prevProcessing = useRef(
    customSpeechRecognitionEnabled ? customSpeechRecognition.initialState.processing : false
  );
  const onSendPersisted = useRef(onSend);
  onSendPersisted.current = onSend;

  const [customSpeechRecognitionState, setCustomSpeechRecognitionState] = useState<ChatSpeechRecognitionState>(
    customSpeechRecognitionEnabled
      ? customSpeechRecognition.initialState
      : {
          listening: reactSpeechRecognition.listening,
          transcript: reactSpeechRecognition.transcript,
          processing: false,
          initializing: false,
          microphoneAvailable: reactSpeechRecognition.isMicrophoneAvailable,
        }
  );

  const onStartListening = (): void => {
    if (customSpeechRecognitionEnabled) {
      customSpeechRecognition.resetTranscript();
      customSpeechRecognition.startListening();
    } else {
      reactSpeechRecognition.resetTranscript();
      ReactSpeechRecognition.startListening({ continuous: true });
    }
  };

  const onStopListening = (): void => {
    if (customSpeechRecognitionEnabled) {
      customSpeechRecognition.stopListening();
    } else {
      ReactSpeechRecognition.stopListening();
    }
  };

  useLayoutEffect(() => {
    if (customSpeechRecognitionEnabled || !reactSpeechRecognition.listening) return;

    onValueChange(reactSpeechRecognition.transcript);
  }, [customSpeechRecognitionEnabled, reactSpeechRecognition.transcript]);

  useEffect(() => {
    if (customSpeechRecognitionEnabled) {
      if (prevProcessing.current && !customSpeechRecognitionState.processing) {
        onSendPersisted.current?.();
        customSpeechRecognition.resetTranscript();
        textareaRef.current?.focus();
      }

      prevProcessing.current = customSpeechRecognitionState.processing;
    } else {
      if (prevListening.current && !reactSpeechRecognition.listening) {
        onSendPersisted.current?.();
        reactSpeechRecognition.resetTranscript();
        textareaRef.current?.focus();
      }

      prevListening.current = reactSpeechRecognition.listening;
    }
  }, [customSpeechRecognitionEnabled, reactSpeechRecognition.listening, customSpeechRecognitionState.processing]);

  useEffect(() => {
    if (!customSpeechRecognitionEnabled) return undefined;

    return customSpeechRecognition.onStateChange((nextState) => {
      onValueChange(nextState.transcript);
      setCustomSpeechRecognitionState(nextState);
    });
  }, [customSpeechRecognitionEnabled]);

  return {
    available: customSpeechRecognitionEnabled || reactSpeechRecognition.browserSupportsSpeechRecognition,
    listening: customSpeechRecognitionEnabled
      ? customSpeechRecognitionState.listening
      : reactSpeechRecognition.listening,
    processing: customSpeechRecognitionEnabled ? customSpeechRecognitionState.processing : false,
    textareaRef,
    initializing: customSpeechRecognitionEnabled ? customSpeechRecognitionState.initializing : false,
    stopListening: onStopListening,
    startListening: onStartListening,
    microphoneAvailable: customSpeechRecognitionEnabled
      ? customSpeechRecognitionState.microphoneAvailable
      : reactSpeechRecognition.isMicrophoneAvailable,
  };
};
