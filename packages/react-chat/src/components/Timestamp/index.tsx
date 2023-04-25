import { formatTimestamp } from '@/components/Timestamp/utils';

import Container from './styled';

export interface TimestampProps {
  /**
   * A timestamp in milliseconds since unix epoch.
   */
  value: number;
}

const Timestamp: React.FC<TimestampProps> = ({ value }) => <Container>{formatTimestamp(value)}</Container>;

/**
 * Formats and styles a timestamp as 12-hour time.
 */
export default Object.assign(Timestamp, {
  Container,
});
