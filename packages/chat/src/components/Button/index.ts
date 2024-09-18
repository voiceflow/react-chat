import { bindVariants } from '@/utils/variants';

import { ButtonVariant } from './constants';
import { PrimaryButton } from './Primary';
import { SecondaryButton } from './Secondary';
import { Container, Reset } from './styled';

const VARIANTS = {
  [ButtonVariant.PRIMARY]: PrimaryButton,
  [ButtonVariant.SECONDARY]: SecondaryButton,
};

const Button = bindVariants(VARIANTS, ButtonVariant.PRIMARY);

/**
 * A button with a label.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/core-button--primary-info}
 */
export default Object.assign(Button, {
  Variant: ButtonVariant,

  Reset,
  Container,
  Primary: PrimaryButton,
  Secondary: SecondaryButton,
});
