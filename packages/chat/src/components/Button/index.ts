import { bindVariants } from '@/utils/variants';

import { ButtonVariant } from './constants';
import InlineButton from './Inline';
// import { PrimaryButton } from './Primary';
// import { SecondaryButton } from './Secondary';
// import { Container, Reset } from './styled';

const VARIANTS = {
  // [ButtonVariant.PRIMARY]: PrimaryButton,
  // [ButtonVariant.SECONDARY]: SecondaryButton,
  [ButtonVariant.INLINE]: InlineButton,
};

const Button = bindVariants(VARIANTS, ButtonVariant.INLINE);

/**
 * A button with a label.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/core-button--primary-info}
 */
export default Object.assign(Button, {
  Variant: ButtonVariant,

  // Reset,
  // Container,
  // Primary: PrimaryButton,
  // Secondary: SecondaryButton,
  Inline: InlineButton,
});
