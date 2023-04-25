import { ANIMATION_DURATION, Container, Dot } from './styled';

const ANIMATION_DELAY = Math.floor(ANIMATION_DURATION / 3);

const TypingIndicator: React.FC = () => (
  <Container>
    {Array.from({ length: 3 }).map((_, index) => (
      <Dot css={{ animationDelay: `${ANIMATION_DELAY * (index + 1)}ms` }} key={index} />
    ))}
  </Container>
);

/**
 * An animated indicator to show that the system is preparing a response.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/docs/components-typingindicator--default}
 */
export default Object.assign(TypingIndicator, {
  Container,
  Dot,
});
