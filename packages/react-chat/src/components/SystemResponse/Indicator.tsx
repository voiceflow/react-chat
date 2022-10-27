import Avatar from '@/components/Avatar';
import TypingIndicator from '@/components/TypingIndicator';

import { Container } from './styled';

export interface IndicatorProps {
  avatar: string;
}

const Indicator: React.FC<IndicatorProps> = ({ avatar }) => (
  <Container withImage center>
    <Avatar avatar={avatar} />
    <TypingIndicator />
  </Container>
);

export default Indicator;
