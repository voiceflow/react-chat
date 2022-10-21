import Icon, { IconProps } from '@/components/Icon';

import { Container } from './styled';

export interface BubbleProps extends React.ComponentProps<typeof Container> {
  svg: IconProps['svg'];
}

const Bubble: React.FC<BubbleProps> = ({ svg, color, ...props }) => (
  <Container {...props}>
    <Icon svg={svg} css={{ color, ...props.css }} />
  </Container>
);

export default Object.assign(Bubble, {
  Container,
});
