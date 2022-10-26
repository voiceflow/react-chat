import { forwardRef } from 'react';

import Icon from '@/components/Icon';

import { ButtonContainer } from './styled';

export interface CarouselButtonProps {
  onClick?: VoidFunction;
  alignment: 'left' | 'right';
  visible: boolean;
  containerEl: HTMLElement;
}

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
