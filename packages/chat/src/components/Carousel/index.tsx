import clsx from 'clsx';
import { useRef } from 'react';

import { ClassName } from '@/constants';

import { Card } from '../Card';
import { CARD_WIDTH } from '../Card/styles.css';
import type { CardProps } from '../Card/types';
import { CarouselButton } from './CarouselButton';
import { useScrollObserver, useScrollTo } from './hooks';
import { cardsContainer, cardsInnerContainer, carouselContainer, GUTTER_WIDTH, lastCardSpacer } from './styles.css';

const CARD_WITH_GUTTER = CARD_WIDTH + GUTTER_WIDTH;

export interface CarouselProps {
  /**
   * A list of props objects which will be passed to {@link Card} components.
   */
  cards: CardProps[];
}

/**
 * A carousel of {@link Card} components that can be scrolled natively or with buttons.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-carousel--single-card}
 */
export const Carousel: React.FC<CarouselProps> = ({ cards }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { showPreviousButton, showNextButton } = useScrollObserver(scrollContainerRef, cards);

  const scrollToPrevious = useScrollTo(scrollContainerRef, (el) => Math.ceil(el.scrollLeft / CARD_WITH_GUTTER) - 1);
  const scrollToNext = useScrollTo(scrollContainerRef, (el) => Math.floor(el.scrollLeft / CARD_WITH_GUTTER) + 1);

  return (
    <div className={clsx(ClassName.CAROUSEL, carouselContainer)}>
      <div ref={scrollContainerRef} className={cardsContainer}>
        <div className={cardsInnerContainer}>
          {cards.map((card, i) => (
            <Card {...card} key={i} />
          ))}
          <div className={lastCardSpacer}> </div>
        </div>
      </div>
      <CarouselButton direction="left" visible={showPreviousButton} onClick={scrollToPrevious} />
      <CarouselButton direction="right" visible={showNextButton} onClick={scrollToNext} />
    </div>
  );
};
