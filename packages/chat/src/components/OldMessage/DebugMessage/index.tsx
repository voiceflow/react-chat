import { topCaret as TopCaret } from '@/assets/svg';
import type { VariantProp } from '@/types';

import { Container } from './styled';

export interface DebugMessageProps extends React.PropsWithChildren {
  /**
   * The end of the message where the arrow is rendered.
   *
   * @default 'left'
   */
  orientation?: VariantProp<typeof Container, 'orientation'>;
}

const DebugMessage: React.FC<DebugMessageProps> = ({ children, ...props }) => (
  <Container {...props}>
    <TopCaret />
    {children}
  </Container>
);

export default Object.assign(DebugMessage, {
  Container,
});
