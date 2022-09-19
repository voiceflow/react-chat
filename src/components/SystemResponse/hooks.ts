import { useEffect, useState } from 'react';

import { MessageProps } from './types';

export * from './types';

export const useAnimatedMessages = (messages: MessageProps[], isAnimated: boolean, onAnimationEnd: VoidFunction) => {
  const shouldAnimate = isAnimated && messages.length;
  const [showIndicator, setShowIndicator] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(shouldAnimate ? [] : messages);

  useEffect(() => {
    if (!shouldAnimate) return undefined;

    setShowIndicator(true);
    setVisibleMessages([]);

    const remaining = [...messages];
    let timer: NodeJS.Timeout;
    const setTimer = () => {
      timer = setTimeout(() => {
        const next = remaining.shift()!;

        setVisibleMessages((prev) => [...prev, next]);

        if (remaining.length === 0) {
          setShowIndicator(false);
          onAnimationEnd();
        } else {
          setTimer();
        }
      }, 1000);
    };

    setTimer();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return {
    showIndicator,
    visibleMessages,
  };
};
