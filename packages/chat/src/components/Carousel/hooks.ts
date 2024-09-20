import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

import type { CardProps } from '../Card';
import { CARD_WITH_GUTTER_WIDTH, NEXT_CONTROL_BOUNDARY, PREVIOUS_CONTROL_BOUNDARY } from './constants';
import { CAROUSEL_GUTTER_WIDTH } from './styled';

export const useScrollTo =
  <T extends HTMLElement>(ref: RefObject<T> | undefined, getNextIndex: (el: T) => number) =>
  () => {
    const el = ref?.current;
    if (!el) return;

    const index = getNextIndex(el);

    el.scrollTo({
      left: index && index * CARD_WITH_GUTTER_WIDTH,
      behavior: 'smooth',
    });
  };

export const useScrollObserver = (
  containerRef: RefObject<HTMLDivElement> | undefined,
  controlsRef: RefObject<HTMLSpanElement> | undefined,
  cards: CardProps[]
) => {
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const hasMultipleCards = cards.length > 1;

  useEffect(() => {
    if (!controlsRef?.current || !hasMultipleCards) return;

    setShowNextButton(true);
  }, []);

  useEffect(() => {
    const containerEl = containerRef?.current;
    if (!containerEl || !hasMultipleCards) return undefined;

    const trackWidth = CARD_WITH_GUTTER_WIDTH * cards.length - CAROUSEL_GUTTER_WIDTH;

    const handleScroll = (): void => {
      const { scrollLeft } = containerEl;

      setShowPreviousButton(scrollLeft >= PREVIOUS_CONTROL_BOUNDARY);
      setShowNextButton(scrollLeft <= trackWidth - NEXT_CONTROL_BOUNDARY);
    };

    containerEl.addEventListener('scroll', handleScroll);

    return () => {
      containerEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    previousButtonRef,
    nextButtonRef,
    showPreviousButton,
    showNextButton,
  };
};
