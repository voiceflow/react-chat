import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';

import { MessageProps } from './types';

export * from './types';

enum AnimationType {
  MESSAGE = 'message',
  INDICATOR = 'indicator',
}

type Animation<T extends AnimationType = AnimationType> = {
  [AnimationType.MESSAGE]: { type: AnimationType.MESSAGE; message: MessageProps };
  [AnimationType.INDICATOR]: { type: AnimationType.INDICATOR; delay: number };
}[T];

const DEFAULT_MESSAGE_DELAY = 1000;

const createAnimateIndicator = (delay: number = DEFAULT_MESSAGE_DELAY): Animation<AnimationType.INDICATOR> => ({
  type: AnimationType.INDICATOR,
  delay,
});

export const useAnimatedMessages = ({
  messages,
  isLive,
  onAnimationEnd,
}: {
  messages: MessageProps[];
  isLive: boolean;
  onAnimationEnd: VoidFunction;
}) => {
  const shouldAnimate = !!(isLive && messages.length);
  const [complete, setComplete] = useState(!shouldAnimate);
  const [showIndicator, setShowIndicator] = useState(shouldAnimate);
  const [visibleMessages, setVisibleMessages] = useState(shouldAnimate ? [] : messages);

  useEffect(() => {
    if (!shouldAnimate) return undefined;

    const animations = messages.flatMap<Animation>((message) => [createAnimateIndicator(message.delay), { type: AnimationType.MESSAGE, message }]);

    let timer: NodeJS.Timeout;
    const setTimer = (callback: VoidFunction, messageDelay?: number) => {
      if (!messageDelay || messageDelay === 0) {
        callback();
        return;
      }

      timer = setTimeout(() => {
        callback();
      }, messageDelay);
    };

    const animate = () => {
      const next = animations.shift();
      if (!next) {
        onAnimationEnd();
        setComplete(true);
        setShowIndicator(false);
        return;
      }

      match(next)
        .with({ type: AnimationType.MESSAGE }, ({ message }) => {
          setShowIndicator(false);
          setVisibleMessages((prev) => [...prev, message]);
          setTimer(animate);
        })
        .with({ type: AnimationType.INDICATOR }, ({ delay = DEFAULT_MESSAGE_DELAY }) => {
          setShowIndicator(true);
          setTimer(animate, delay);
        })
        .exhaustive();
    };

    animate();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return {
    complete,
    showIndicator,
    visibleMessages,
  };
};
