import Avatar from '@/components/Avatar';
import TypingIndicator from '@/components/TypingIndicator';

import { IndicatorContainer } from './styled';

export interface IndicatorProps {
  avatar: string;
}

const Indicator: React.FC<IndicatorProps> = ({ avatar }) => (
  <IndicatorContainer withImage center>
    <Avatar avatar={avatar} />
    <TypingIndicator />
  </IndicatorContainer>
);

export default Indicator;
