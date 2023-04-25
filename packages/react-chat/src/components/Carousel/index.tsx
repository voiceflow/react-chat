import { RefObject } from 'react';
import { createPortal } from 'react-dom';

import Card, { CardProps } from '@/components/Card';

import CarouselButton from './CarouselButton';
import { CARD_WITH_GUTTER_WIDTH } from './constants';
import { useScrollObserver, useScrollTo } from './hooks';
import { Container } from './styled';

export interface CarouselProps {
  /**
   * A list of props objects which will be passed to {@link Card} components.
   */
  cards: CardProps[];

  /**
   * A reference to the HTML element of a parent horizontal scrolling container.
   */
  containerRef?: RefObject<HTMLDivElement>;

  /**
   * A reference to an HTML element to anchor the carousel controls.
   */
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

/**
 * A carousel of {@link Card} components that can be scrolled natively or with buttons.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-carousel--single-card}
 */
export default Object.assign(Carousel, {
  Container,
});
