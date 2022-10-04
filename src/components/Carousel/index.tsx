import { RefObject } from 'react';
import { createPortal } from 'react-dom';

import Card, { CardProps } from '@/components/Card';

import CarouselButton from './CarouselButton';
import { CARD_WITH_GUTTER_WIDTH } from './constants';
import { useScrollObserver, useScrollTo } from './hooks';
import { Container } from './styled';

export interface CarouselProps {
  cards: CardProps[];
  containerRef?: RefObject<HTMLDivElement>;
  controlsRef?: RefObject<HTMLSpanElement>;
}

const Carousel: React.FC<CarouselProps> = ({ cards, containerRef, controlsRef }) => {
  const { previousButtonRef, nextButtonRef, showPreviousButton, showNextButton } = useScrollObserver(containerRef, controlsRef, cards);
  const containerEl = containerRef?.current;
  const controlsEl = controlsRef?.current;
  const showControls = containerEl && controlsEl;

  const scrollToPrevious = useScrollTo(containerRef, (el) => Math.ceil(el.scrollLeft / CARD_WITH_GUTTER_WIDTH) - 1);
  const scrollToNext = useScrollTo(containerRef, (el) => Math.floor(el.scrollLeft / CARD_WITH_GUTTER_WIDTH) + 1);

  return (
    <>
      <Container>
        {cards.map((card, index) => (
          <Card {...card} key={index} />
        ))}
      </Container>
      {showControls &&
        createPortal(
          <>
            <CarouselButton
              ref={previousButtonRef}
              alignment="left"
              visible={showPreviousButton}
              containerEl={containerEl}
              onClick={scrollToPrevious}
            />
            <CarouselButton ref={nextButtonRef} alignment="right" visible={showNextButton} containerEl={containerEl} onClick={scrollToNext} />
          </>,
          controlsEl
        )}
    </>
  );
};

export default Object.assign(Carousel, {
  Container,
});
