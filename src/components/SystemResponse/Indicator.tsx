import Avatar from '@/components/Avatar';
import TypingIndicator from '@/components/TypingIndicator';

import { Container } from './styled';

export interface IndicatorProps {
  image: string;
}

const Indicator: React.FC<IndicatorProps> = ({ image }) => (
  <Container withImage center>
    <Avatar image={image} />
    <TypingIndicator />
  </Container>
);

export default Indicator;
