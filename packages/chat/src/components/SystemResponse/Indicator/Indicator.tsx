import { Avatar } from '@/components/Avatar';
import { MessageContainer } from '@/components/MessageContainer';
import { TypingIndicator } from '@/components/TypingIndicator';

import { indicatorContainer } from './Indicator.css';

export interface IndicatorProps {
  avatar: string;
  isLast?: boolean;
}

const Indicator: React.FC<IndicatorProps> = ({ avatar, isLast }) => (
  <MessageContainer className={indicatorContainer} isLast={isLast}>
    <Avatar avatar={avatar} />
    <TypingIndicator />
  </MessageContainer>
);

export default Indicator;
