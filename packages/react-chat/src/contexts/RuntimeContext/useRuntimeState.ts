import type { BaseRequest } from '@voiceflow/dtos-interact';
import { isTextRequest, RequestType } from '@voiceflow/dtos-interact';
import type { TraceDeclaration } from '@voiceflow/sdk-runtime';
import cuid from 'cuid';
import { useEffect, useRef, useState } from 'react';

import { DEFAULT_MESSAGE_DELAY, MessageType } from '@/components/SystemResponse/constants';
import { isIOS } from '@/device';
import type { AssistantOptions } from '@/dtos/AssistantOptions.dto';
import type { ChatConfig } from '@/dtos/ChatConfig.dto';
import { useStateRef } from '@/hooks/useStateRef';
import { useLocalStorageState } from '@/hooks/useStorage';
import type { SendMessage, SessionOptions, TurnProps } from '@/types';
import { SessionStatus, TurnType } from '@/types';
import { handleActions } from '@/utils/actions';
import { broadcast, BroadcastType } from '@/utils/broadcast';
import { getSession, saveSession } from '@/utils/session';

import { AudioController } from './audio-controller';
import type { RuntimeMessage } from './messages';
import { resolveAction } from './runtime.utils';
import { silentAudio } from './silent-audio';
import { EffectExtensions } from './traces/EffectExtensions.trace';
import { NoReply } from './traces/NoReply.trace';
import { ResponseExtensions } from './traces/ResponseExtensions.trace';
import { useNoReply } from './useNoReply';
import { createContext, useRuntimeAPI } from './useRuntimeAPI';

export interface Settings {
  assistant: AssistantOptions;
  config: ChatConfig;
  traceHandlers?: TraceDeclaration<RuntimeMessage, any>[];
}

const DEFAULT_SESSION_PARAMS = {
  turns: [],
  startTime: Date.now(),
};

export const useRuntimeState = ({ assistant, config, traceHandlers }: Settings) => {
  const [audio] = useState(() => new AudioController());
  const playAudiosStack = useRef<string[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [audioOutput, setAudioOutput, audioOutputRef] = useLocalStorageState(
    'audio-output',
    assistant.defaultAudioOutput ?? false
  );

  const [session, setSession, sessionRef] = useStateRef<Required<SessionOptions>>(() => ({
    ...DEFAULT_SESSION_PARAMS,
    status: config.autostart ? SessionStatus.IDLE : SessionStatus.ENDED,
    // retrieve stored session
    ...getSession(assistant.persistence, config.verify.projectID, config.userID),
  }));

  const [indicator, setIndicator] = useState(false);
  const { clearNoReplyTimeout, setNoReplyTimeout } = useNoReply(() => ({ interact, isStatus }));

  const runtime = useRuntimeAPI({
    ...config,
    ...session,
    traceHandlers: [
      NoReply(setNoReplyTimeout),
      ...EffectExtensions(assistant.extensions),
      ...ResponseExtensions(assistant.extensions),
      ...(traceHandlers ?? []),
    ],
  });

  const isAudioOutputEnabled = () => assistant.audioInterface && audioOutputRef.current;

  // status management
  const setStatus = (status: SessionStatus) => {
    setSession((prev) => (prev.status === status ? prev : { ...prev, status }));
  };
  const isStatus = (status: SessionStatus) => {
    return sessionRef.current.status === status;
  };

  // turn management
  const setTurns = (action: (turns: TurnProps[]) => TurnProps[]) => {
    setSession((prev) => ({ ...prev, turns: action(prev.turns) }));
  };

  const addTurn = (turn: TurnProps) => setTurns((prev) => [...prev, turn]);

  const reset = () => setTurns(() => []);

  const interact: SendMessage = async (action: BaseRequest, message?: string) => {
    clearNoReplyTimeout();

    if (sessionRef.current.status === SessionStatus.ENDED) return;

    // create a transcript on the first turn, do this async
    if (sessionRef.current.turns.length === 1) runtime.saveTranscript();

    handleActions(action);

    const userMessage = message || (isTextRequest(action) ? action.payload : null);
    if (userMessage) {
      addTurn({
        id: cuid(),
        type: TurnType.USER,
        message: userMessage,
        timestamp: Date.now(),
      });
    }

    const userAction = resolveAction(action, getTurns());

    setIndicator(true);
    const context = await runtime.interact(userAction, { tts: isAudioOutputEnabled() }).catch((error) => {
      // TODO: better define error condition
      console.error(error);
      return createContext();
    });
    setIndicator(false);

    addTurn({
      id: cuid(),
      type: TurnType.SYSTEM,
      timestamp: Date.now(),
      ...context,
    });

    const shouldPlay = isAudioOutputEnabled() && playAudiosStack.current.length === 0;

    if (isAudioOutputEnabled()) {
      context.messages.forEach((message) => {
        if (message.type === MessageType.TEXT && message.audio?.src) {
          playAudiosStack.current.push(message.audio.src);
        }
      });
    }

    if (shouldPlay) {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, DEFAULT_MESSAGE_DELAY));

      playAudioCircle();
    }

    broadcast({ type: BroadcastType.INTERACT, payload: { session: sessionRef.current, action: userAction } });
    saveSession(assistant.persistence, config.verify.projectID, sessionRef.current);
  };

  const launch = async (): Promise<void> => {
    playAudiosStack.current = [];

    // we need to play a silent audio on user interaction to enable async audio playback
    if (isIOS() && isAudioOutputEnabled()) {
      audio.play(silentAudio);
    }

    if (sessionRef.current.turns.length) reset();

    setStatus(SessionStatus.ACTIVE);
    await interact(config.launch?.event ?? { type: RequestType.LAUNCH });
  };

  const reply = async (message: string): Promise<void> => {
    stopAudios();

    interact({ type: RequestType.TEXT, payload: message });
  };

  const open = async () => {
    broadcast({ type: BroadcastType.OPEN });
    setOpen(true);

    if (isStatus(SessionStatus.IDLE)) {
      await launch();
    }
  };

  const close = () => {
    stopAudios();

    broadcast({ type: BroadcastType.CLOSE });
    saveSession(assistant.persistence, config.verify.projectID, sessionRef.current);
    setOpen(false);
  };

  const getTurns = () => sessionRef.current.turns;

  const stopAudios = () => {
    playAudiosStack.current = [];
    audio.stop();
  };

  const playAudioCircle = async () => {
    if (!isAudioOutputEnabled() || !playAudiosStack.current.length) return;

    await audio.play(playAudiosStack.current.shift());

    playAudioCircle();
  };

  const toggleAudioOutput = () => {
    stopAudios();
    setAudioOutput((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    return () => {
      stopAudios();
    };
  }, [isOpen]);

  return {
    state: {
      session,
      isOpen,
      indicator,
      audioOutput,
    },
    api: {
      launch,
      reply,
      open,
      interact,
      close,
      addTurn,
      feedback: runtime.saveFeedback,
      setStatus,
      setOpen,
      isStatus,
      reset,
      getTurns,
      setIndicator,
      setAudioOutput,
      toggleAudioOutput,

      // these are meant to be static, so bundling them with the API
      assistant,
      config,
    },
  };
};

export type RuntimeState = ReturnType<typeof useRuntimeState>;
