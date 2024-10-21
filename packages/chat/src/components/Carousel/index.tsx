import clsx from 'clsx';
import { useRef, type RefObject } from 'react';

import { ClassName } from '@/constants';

import Card from '../Card';
import type { CardProps } from '../Card/types';
import CarouselButton from './CarouselButton';
import { CARD_WITH_GUTTER_WIDTH } from './constants';
import { useScrollObserver, useScrollTo } from './hooks';
import { Container } from './styled';
import { cardsContainer, carouselContainer, container } from './styles.css';

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

const Carousel: React.FC<CarouselProps> = ({ cards }) => {
  // const { previousButtonRef, nextButtonRef, showPreviousButton, showNextButton } = useScrollObserver(
  //   containerRef,
  //   controlsRef,
  //   cards
  // );
  // const containerEl = containerRef?.current;
  // const controlsEl = controlsRef?.current;
  // const showControls = containerEl && controlsEl;
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToPrevious = useScrollTo(containerRef, (el) => Math.ceil(el.scrollLeft / CARD_WITH_GUTTER_WIDTH) - 1);
  const scrollToNext = useScrollTo(containerRef, (el) => Math.floor(el.scrollLeft / CARD_WITH_GUTTER_WIDTH) + 1);

  return (
    <div className={container}>
      <div ref={containerRef} className={clsx(ClassName.CAROUSEL, carouselContainer)}>
        <div className={cardsContainer}>
          {cards.map((card, i) => (
            <Card {...card} key={i} />
          ))}
        </div>
      </div>
      <CarouselButton direction="left" visible={true} onClick={scrollToPrevious} />
      <CarouselButton direction="right" visible={true} onClick={scrollToNext} />
    </div>
  );

  // return (
  //   <>
  //     <Container>
  //       {cards.map((card, index) => (
  //         <Card {...card} key={index} />
  //       ))}
  //     </Container>
  //     {showControls &&
  //       createPortal(
  //         <>
  //           <CarouselButton
  //             ref={previousButtonRef}
  //             alignment="left"
  //             visible={showPreviousButton}
  //             containerEl={containerEl}
  //             onClick={scrollToPrevious}
  //           />
  //           <CarouselButton
  //             ref={nextButtonRef}
  //             alignment="right"
  //             visible={showNextButton}
  //             containerEl={containerEl}
  //             onClick={scrollToNext}
  //           />
  //         </>,
  //         controlsEl
  //       )}
  //   </>
  // );
};

/**
 * A carousel of {@link Card} components that can be scrolled natively or with buttons.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-carousel--single-card}
 */
export default Carousel;
