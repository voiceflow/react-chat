import { formatTimestamp } from '@/components/Timestamp/utils';

import Container from './styled';

export interface TimestampProps {
  value: number;
}

const Timestamp: React.FC<TimestampProps> = ({ value }) => <Container>{formatTimestamp(value)}</Container>;

export default Object.assign(Timestamp, {
  Container,
});
