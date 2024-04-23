import type { IconProps } from '@/components/Icon';
import Icon from '@/components/Icon';
import type { VariantProp } from '@/types';

import { Container } from './styled';

export interface BubbleProps extends React.ComponentProps<typeof Container> {
  /**
   * The name of the SVG icon to be rendered or a React component.
   *
   * @see {@link https://github.com/voiceflow/react-chat/tree/master/packages/react-chat/src/assets/svg the available icons}
   */
  svg: IconProps['svg'];

  /**
   * Pre-defined size variants.
   *
   * @default 'large'
   */
  size?: VariantProp<typeof Container, 'size'>;
}

const Bubble: React.FC<BubbleProps> = ({ svg, color, ...props }) => (
  <Container {...props}>
    <Icon svg={svg} css={{ color, ...props.css }} />
  </Container>
);

/**
 * Call-to-action button with an icon.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/core-bubble--small}
 */
export default Object.assign(Bubble, {
  Container,
});
