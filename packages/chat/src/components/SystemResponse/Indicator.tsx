import { Avatar } from '@/components/Avatar';
import { TypingIndicator } from '@/components/TypingIndicator';

import { indicatorContainer } from './Indicator.css';

export interface IndicatorProps {
  avatar: string;
}

const Indicator: React.FC<IndicatorProps> = ({ avatar }) => (
  <div className={indicatorContainer}>
    <Avatar avatar={avatar} />
    <TypingIndicator />
  </div>
);

export default Indicator;
