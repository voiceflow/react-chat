import '../../styles.css';

import React, { useCallback, useContext } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { NewChat } from '@/components/NewChat';
import { chatContentWrapper } from '@/components/NewChat/NewChat.css';
import Indicator from '@/components/SystemResponse/Indicator/Indicator';
import { UserResponse } from '@/components/UserResponse';
import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts/RuntimeContext';
import type { FeedbackName } from '@/contexts/RuntimeContext/useRuntimeAPI';
import { DEFAULT_CHAT_AVATAR } from '@/dtos/AssistantOptions.dto';
import { usePalette } from '@/hooks/usePalette';
import type { UserTurnProps } from '@/types';
import { SessionStatus, TurnType } from '@/types';

export interface ChatWindowProps {
  className?: string;
  isMobile?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ isMobile }) => {
  const runtime = useContext(RuntimeStateAPIContext);
  const state = useContext(RuntimeStateContext);
  const { assistant, config } = runtime;
  const palette = usePalette(assistant);

  // emitters
  const restartChat = useCallback((): void => {
    runtime.setStatus(SessionStatus.ENDED);
    runtime.stopChat();
  }, []);

  const getPreviousUserTurn = useCallback(
    (turnIndex: number): UserTurnProps | null => {
      const turn = state.session.turns[turnIndex - 1];
      return turn?.type === TurnType.USER ? turn : null;
    },
    [state.session.turns]
  );

  if (!palette) return null;

  const AGENT_AVATAR = assistant.chat.agentImage.enabled
    ? (assistant.chat.agentImage.url ?? DEFAULT_CHAT_AVATAR)
    : undefined;

  return (
    <NewChat.Container isMobile={isMobile} palette={palette}>
      <NewChat
        headerProps={{
          title: assistant.chat.banner.title,
          showImage: assistant.chat.headerImage.enabled,
          image: assistant.chat.headerImage.url,
        }}
        welcomeMessageProps={{
          enabled: assistant.chat.banner.enabled,
          title: assistant.chat.banner.title,
          description: assistant.chat.banner.description,
          avatar: assistant.chat.banner.imageURL,
        }}
        footerProps={{
          showPoweredBy: assistant.common.poweredBy,
          messageInputProps: {
            onSubmit: runtime.reply,
            audioInterface: assistant.chat.voiceInput,
          },
          extraLinkText: assistant.common.footerLink.enabled ? assistant.common.footerLink.text : undefined,
          extraLinkUrl: assistant.common.footerLink.enabled ? assistant.common.footerLink.url : undefined,
          onSend: runtime.reply,
        }}
        startTime={state.session.startTime}
        hasEnded={runtime.isStatus(SessionStatus.ENDED)}
        isLoading={runtime.isStatus(SessionStatus.IDLE) && state.session.turns.length === 0 && config.autostart}
        onStart={runtime.launch}
        onEnd={restartChat}
        onMinimize={runtime.close}
        audioInterface={assistant.chat.voiceInput}
        isMobile={isMobile}
      >
        {state.session.turns.map((turn, turnIndex) => {
          return match(turn)
            .with({ type: TurnType.USER }, ({ id, ...props }) => {
              return (
                <UserResponse
                  {...R.omit(props, ['type'])}
                  key={id}
                  isLast={turnIndex === state.session.turns.length - 1}
                />
              );
            })
            .with({ type: TurnType.SYSTEM }, ({ id, ...props }) => (
              <SystemResponse
                key={id}
                {...R.omit(props, ['type'])}
                avatar={AGENT_AVATAR}
                feedback={{
                  onClick: (feedback: FeedbackName) => {
                    runtime.feedback(feedback, props.messages, getPreviousUserTurn(turnIndex));
                  },
                }}
                isLast={turnIndex === state.session.turns.length - 1}
              />
            ))
            .exhaustive();
        })}
        {state.indicator && (
          <div className={chatContentWrapper}>
            <Indicator avatar={AGENT_AVATAR} isLast={true} />
          </div>
        )}
      </NewChat>
    </NewChat.Container>
  );
};
