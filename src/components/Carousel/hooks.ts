import { RefObject, useEffect, useRef, useState } from 'react';

import { CardProps } from '../Card';
import { CARD_WITH_GUTTER_WIDTH, NEXT_CONTROL_BOUNDARY, PREVIOUS_CONTROL_BOUNDARY } from './constants';

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
  const trackRef = useRef<HTMLDivElement>(null);
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const hasMultipleCards = cards.length > 1;

  useEffect(() => {
    if (!controlsRef?.current || !hasMultipleCards) return;

    setShowNextButton(true);
  }, []);

  useEffect(() => {
    const containerEl = containerRef?.current;
    const trackEl = trackRef?.current;
    if (!containerEl || !trackEl || !hasMultipleCards) return undefined;

    const handleScroll = (): void => {
      const { scrollLeft } = containerEl;

      if (scrollLeft < PREVIOUS_CONTROL_BOUNDARY) {
        setShowPreviousButton(false);
      } else {
        setShowPreviousButton(true);
      }

      if (scrollLeft > trackEl.clientWidth - NEXT_CONTROL_BOUNDARY) {
        setShowNextButton(false);
      } else {
        setShowNextButton(true);
      }
    };

    containerEl.addEventListener('scroll', handleScroll);

    return () => {
      containerEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    trackRef,
    previousButtonRef,
    nextButtonRef,
    showPreviousButton,
    showNextButton,
  };
};
