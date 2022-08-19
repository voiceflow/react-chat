import Card, { CardProps } from '@/components/Card';

import { Container } from './styled';

export interface CarouselProps {
  cards: CardProps[];
}

const Carousel: React.FC<CarouselProps> = ({ cards }) => (
  <Container>
    {cards.map((card, index) => (
      <Card {...card} key={index} />
    ))}
  </Container>
);

export default Object.assign(Carousel, {
  Container,
});
