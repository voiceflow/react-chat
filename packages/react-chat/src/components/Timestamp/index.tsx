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
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/docs/core-timestamp--default}
 */
export default Object.assign(Timestamp, {
  Container,
});
