import { useCallback, useEffect, useRef, useState } from 'react';
import { match } from 'ts-pattern';

import { useDidUpdateEffect } from '@/hooks';

import { DEFAULT_MESSAGE_DELAY } from './constants';
import type { MessageProps } from './types';

export * from './types';

enum AnimationType {
  MESSAGE = 'message',
  INDICATOR = 'indicator',
}

type Animation<T extends AnimationType = AnimationType> = {
  [AnimationType.MESSAGE]: { type: AnimationType.MESSAGE; message: MessageProps };
  [AnimationType.INDICATOR]: { type: AnimationType.INDICATOR; messageDelay: number };
}[T];

const createAnimateIndicator = (messageDelay: number = DEFAULT_MESSAGE_DELAY): Animation<AnimationType.INDICATOR> => ({
  type: AnimationType.INDICATOR,
  messageDelay,
});

export const useAnimatedMessages = ({
  messages,
  isLast,
}: {
  messages: MessageProps[];
  isLast: boolean | undefined;
}) => {
  const shouldAnimate = useRef(isLast && !!messages.length);
  const [complete, setComplete] = useState(!shouldAnimate.current);
  const [showIndicator, setShowIndicator] = useState(shouldAnimate.current);
  const [visibleMessages, setVisibleMessages] = useState(shouldAnimate.current ? [] : messages);

  const endAnimation = useCallback(() => {
    setComplete(true);
    setShowIndicator(false);
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return undefined;

    const animations = messages.flatMap<Animation>((message) => [
      createAnimateIndicator(message.delay),
      { type: AnimationType.MESSAGE, message },
    ]);

    let timer: NodeJS.Timeout;
    const setTimer = (callback: VoidFunction, messageDelay: number) => {
      if (messageDelay === 0) {
        callback();
        return;
      }

      timer = setTimeout(() => {
        callback();
      }, messageDelay);
    };

    const animate = () => {
      if (!shouldAnimate.current) return;

      const next = animations.shift();
      if (!next) {
        endAnimation();
        return;
      }

      match(next)
        .with({ type: AnimationType.MESSAGE }, ({ message }) => {
          setShowIndicator(false);
          setVisibleMessages((prev) => [...prev, message]);
          setTimer(animate, DEFAULT_MESSAGE_DELAY);
        })
        .with({ type: AnimationType.INDICATOR }, ({ messageDelay = DEFAULT_MESSAGE_DELAY }) => {
          setShowIndicator(true);
          setTimer(animate, messageDelay);
        })
        .exhaustive();
    };

    animate();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useDidUpdateEffect(() => {
    if (!isLast) {
      shouldAnimate.current = false;
      endAnimation();
      setVisibleMessages(messages);
    }
  }, [isLast]);

  return {
    complete,
    showIndicator,
    visibleMessages,
  };
};
