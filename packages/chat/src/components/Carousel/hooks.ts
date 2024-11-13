import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

import { CARD_WIDTH } from '../Card/styles.css';
import type { CardProps } from '../Card/types';
import { GUTTER_WIDTH } from './styles.css';

export const useScrollTo =
  <T extends HTMLElement>(ref: RefObject<T> | undefined, getNextIndex: (el: T) => number) =>
  () => {
    const el = ref?.current;
    if (!el) return;

    const index = getNextIndex(el);
    const targetLeft = index * (CARD_WIDTH + GUTTER_WIDTH);
    const duration = 200;
    const start = el.scrollLeft;
    const distance = targetLeft - start;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

    const scroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      el.scrollLeft = start + distance * easedProgress;

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

export const useScrollObserver = (containerRef: RefObject<HTMLDivElement> | undefined, cards: CardProps[]) => {
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const hasMultipleCards = cards.length > 1;

  useEffect(() => {
    if (!hasMultipleCards) return;

    setShowNextButton(true);
  }, []);

  useEffect(() => {
    const containerEl = containerRef?.current;
    if (!containerEl || !hasMultipleCards) return undefined;

    const trackWidth = (CARD_WIDTH + GUTTER_WIDTH) * cards.length - GUTTER_WIDTH;

    const handleScroll = (): void => {
      const { scrollLeft } = containerEl;

      setShowPreviousButton(scrollLeft >= CARD_WIDTH);
      setShowNextButton(scrollLeft <= trackWidth - (CARD_WIDTH + GUTTER_WIDTH));
    };

    containerEl.addEventListener('scroll', handleScroll);

    return () => {
      containerEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    showPreviousButton,
    showNextButton,
  };
};
