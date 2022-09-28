import { RefObject } from 'react';
import { createPortal } from 'react-dom';

import Bubble from '@/components/Bubble';
import Card, { CardProps } from '@/components/Card';

import { CARD_WITH_GUTTER_WIDTH } from './constants';
import { useScrollObserver, useScrollTo } from './hooks';
import { ButtonContainer, Container } from './styled';

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
            <ButtonContainer
              ref={previousButtonRef}
              alignment="left"
              css={{
                transform: `translateY(calc(${containerEl.clientHeight / 2}px - 50%))`,
                opacity: showPreviousButton ? 1 : 0,
                pointerEvents: showPreviousButton ? 'auto' : 'none',
              }}
            >
              <Bubble svg="largeArrowLeft" onClick={scrollToPrevious} />
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
              <Bubble svg="largeArrowLeft" onClick={scrollToNext} />
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
