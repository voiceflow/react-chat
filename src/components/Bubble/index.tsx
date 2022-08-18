import { Container, Frame } from './styled';

export interface BubbleProps extends React.ComponentProps<typeof Container> {
  icon: React.FC<React.ComponentProps<'svg'>>;
  iconColor?: string;
}

const Bubble: React.FC<BubbleProps> = ({ icon: Icon, iconColor, ...props }) => (
  <Container {...props}>
    <Frame>
      <Icon style={{ color: iconColor }} />
    </Frame>
  </Container>
);

export default Object.assign(Bubble, {
  Container,
  Frame,
});
