import clsx from 'clsx';
import { useRef } from 'react';

import { ClassName } from '@/constants';

import Card from '../Card';
import type { CardProps } from '../Card/types';
import CarouselButton from './CarouselButton';
import { CARD_WITH_GUTTER_WIDTH } from './constants';
import { useScrollObserver, useScrollTo } from './hooks';
import { cardsContainer, cardsInnerContainer, cardStyle, carouselContainer } from './styles.css';

export interface CarouselProps {
  /**
   * A list of props objects which will be passed to {@link Card} components.
   */
  cards: CardProps[];
}

const Carousel: React.FC<CarouselProps> = ({ cards }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { showPreviousButton, showNextButton } = useScrollObserver(scrollContainerRef, cards);

  const scrollToPrevious = useScrollTo(
    scrollContainerRef,
    (el) => Math.ceil(el.scrollLeft / CARD_WITH_GUTTER_WIDTH) - 1
  );
  const scrollToNext = useScrollTo(scrollContainerRef, (el) => Math.floor(el.scrollLeft / CARD_WITH_GUTTER_WIDTH) + 1);

  return (
    <div className={carouselContainer}>
      <div ref={scrollContainerRef} className={clsx(ClassName.CAROUSEL, cardsContainer)}>
        <div className={cardsInnerContainer}>
          {cards.map((card, i) => (
            <Card className={cardStyle} {...card} key={i} />
          ))}
        </div>
      </div>
      <CarouselButton direction="left" visible={showPreviousButton} onClick={scrollToPrevious} />
      <CarouselButton direction="right" visible={showNextButton} onClick={scrollToNext} />
    </div>
  );
};

/**
 * A carousel of {@link Card} components that can be scrolled natively or with buttons.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-carousel--single-card}
 */
export default Carousel;
