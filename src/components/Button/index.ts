import { bindVariants } from '@/utils/variants';

import { ButtonVariant } from './constants';
import { PrimaryButton } from './Primary';
import { SecondaryButton } from './Secondary';
import { BaseButton } from './styled';

const VARIANTS = {
  [ButtonVariant.PRIMARY]: PrimaryButton,
  [ButtonVariant.SECONDARY]: SecondaryButton,
};

const Button = bindVariants(VARIANTS, ButtonVariant.PRIMARY);

export default Object.assign(Button, {
  Variant: ButtonVariant,

  Base: BaseButton,
  Primary: PrimaryButton,
  Secondary: SecondaryButton,
});
