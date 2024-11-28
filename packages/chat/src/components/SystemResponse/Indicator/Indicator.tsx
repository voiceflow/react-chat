import clsx from 'clsx';

import { Avatar } from '@/components/Avatar';
import { MessageContainer } from '@/components/MessageContainer';
import { TypingIndicator } from '@/components/TypingIndicator';

import { responseAvatar } from '../styles.css';
import { indicatorContainer } from './Indicator.css';

export interface IndicatorProps {
  avatar: string;
  isLast?: boolean;
  className?: string;
}

const Indicator: React.FC<IndicatorProps> = ({ avatar, isLast, className }) => (
  <MessageContainer className={clsx(indicatorContainer, className)} isLast={isLast}>
    <Avatar avatar={avatar} className={responseAvatar} />
    <TypingIndicator />
  </MessageContainer>
);

export default Indicator;
