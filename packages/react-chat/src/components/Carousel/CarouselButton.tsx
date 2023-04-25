import { forwardRef, MouseEventHandler } from 'react';

import Icon from '@/components/Icon';

import { ButtonContainer } from './styled';

export interface CarouselButtonProps {
  /**
   * The end of the container where the button will be rendered.
   */
  alignment: 'left' | 'right';

  /**
   * If true then the button will be visible, otherwise hidden.
   */
  visible: boolean;

  /**
   * The buttons will be centered vertically based on the height of this element.
   */
  containerEl: HTMLElement;

  /**
   * A click handler for the button.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * A button used to scroll to the previous or next Card in a Carousel.
 */
const CarouselButton = forwardRef<HTMLElement, CarouselButtonProps>(({ onClick, alignment, visible, containerEl }, ref) => (
  <ButtonContainer
    ref={ref}
    alignment={alignment}
    visible={visible}
    css={{
      transform: `translateY(calc(${containerEl.clientHeight / 2}px - 50%))`,
    }}
    onClick={onClick}
  >
    <Icon svg="largeArrowLeft" />
  </ButtonContainer>
));

export default CarouselButton;
