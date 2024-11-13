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

    el.scrollTo({
      left: index && index * (CARD_WIDTH + GUTTER_WIDTH),
      behavior: 'smooth',
    });
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
