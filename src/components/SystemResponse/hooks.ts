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
  [AnimationType.INDICATOR]: { type: AnimationType.INDICATOR };
}[T];

const ANIMATE_INDICATOR: Animation<AnimationType.INDICATOR> = { type: AnimationType.INDICATOR };

export const useAnimatedMessages = ({
  messages,
  messageDelay,
  isLive,
  onAnimationEnd,
}: {
  messages: MessageProps[];
  messageDelay: number;
  isLive: boolean;
  onAnimationEnd: VoidFunction;
}) => {
  const shouldAnimate = !!(isLive && messages.length);
  const [complete, setComplete] = useState(!shouldAnimate);
  const [showIndicator, setShowIndicator] = useState(shouldAnimate);
  const [visibleMessages, setVisibleMessages] = useState(shouldAnimate ? [] : messages);

  useEffect(() => {
    if (!shouldAnimate) return undefined;

    const animations = messages.flatMap<Animation>((message) => [ANIMATE_INDICATOR, { type: AnimationType.MESSAGE, message }]);

    let timer: NodeJS.Timeout;
    const setTimer = (callback: VoidFunction) => {
      timer = setTimeout(() => {
        callback();
      }, messageDelay / 2);
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
        .with({ type: AnimationType.INDICATOR }, () => {
          setShowIndicator(true);
          setTimer(animate);
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
