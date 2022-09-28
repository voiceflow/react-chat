import React, { RefObject, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import Bubble from '@/components/Bubble';
import Card, { CardProps } from '@/components/Card';
import { CARD_WIDTH } from '@/components/Card/styled';

import { ButtonContainer, CAROUSEL_GUTTER_WIDTH, Container } from './styled';

const CARD_WITH_BORDER_WIDTH = CARD_WIDTH + 2;
const PREVIOUS_CONTROL_BOUNDARY = CARD_WITH_BORDER_WIDTH / 3;
const NEXT_CONTROL_BOUNDARY = CARD_WITH_BORDER_WIDTH + CAROUSEL_GUTTER_WIDTH + PREVIOUS_CONTROL_BOUNDARY;
const CARD_WITH_GUTTER_WIDTH = CARD_WITH_BORDER_WIDTH + CAROUSEL_GUTTER_WIDTH;

export interface CarouselProps {
  cards: CardProps[];
  containerRef?: RefObject<HTMLDivElement>;
  controlsRef?: RefObject<HTMLSpanElement>;
}

const Carousel: React.FC<CarouselProps> = ({ cards, containerRef, controlsRef }) => {
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

  const handlePrevious = (): void => {
    const containerEl = containerRef?.current;
    const trackEl = trackRef?.current;
    if (!containerEl || !trackEl) return;

    const { scrollLeft } = containerEl;

    const index = Math.ceil(scrollLeft / CARD_WITH_GUTTER_WIDTH) - 1;

    containerEl.scrollTo({
      left: index && index * CARD_WITH_GUTTER_WIDTH,
      behavior: 'smooth',
    });
  };

  const handleNext = (): void => {
    const containerEl = containerRef?.current;
    const trackEl = trackRef?.current;
    if (!containerEl || !trackEl) return;

    const { scrollLeft } = containerEl;

    const index = Math.floor(scrollLeft / CARD_WITH_GUTTER_WIDTH) + 1;

    containerEl.scrollTo({
      left: index && index * CARD_WITH_GUTTER_WIDTH,
      behavior: 'smooth',
    });
  };

  const containerEl = containerRef?.current;
  const controlsEl = controlsRef?.current;
  const showControls = containerEl && controlsEl;

  return (
    <>
      <Container ref={trackRef}>
        {cards.map((card, index) => (
          <Card {...card} key={index} />
        ))}
      </Container>
      {showControls &&
        createPortal(
          <>
            <ButtonContainer
              ref={previousButtonRef}
              alignment="left"
              css={{
                transform: `translateY(calc(${containerEl.clientHeight / 2}px - 50%))`,
                opacity: showPreviousButton ? 1 : 0,
                pointerEvents: showPreviousButton ? 'auto' : 'none',
              }}
            >
              <Bubble svg="largeArrowLeft" onClick={handlePrevious} />
            </ButtonContainer>
            <ButtonContainer
              ref={nextButtonRef}
              alignment="right"
              css={{
                transform: `translateY(calc(${containerEl.clientHeight / 2}px - 50%))`,
                opacity: showNextButton ? 1 : 0,
                pointerEvents: showNextButton ? 'auto' : 'none',
              }}
            >
              <Bubble svg="largeArrowLeft" onClick={handleNext} />
            </ButtonContainer>
          </>,
          controlsEl
        )}
    </>
  );
};

export default Object.assign(Carousel, {
  Container,
  ButtonContainer,
});
