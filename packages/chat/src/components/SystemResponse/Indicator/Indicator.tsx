import { Avatar } from '@/components/Avatar';
import { MessageContainer } from '@/components/MessageContainer';
import { TypingIndicator } from '@/components/TypingIndicator';

import { indicatorContainer } from './Indicator.css';

export interface IndicatorProps {
  avatar: string;
}

const Indicator: React.FC<IndicatorProps> = ({ avatar }) => (
  <MessageContainer className={indicatorContainer}>
    <Avatar avatar={avatar} />
    <TypingIndicator />
  </MessageContainer>
);

export default Indicator;
