import type { Merge } from 'type-fest';

import type { ControlProps } from '@/utils/controls';
import { createControlled } from '@/utils/controls';
import { chain } from '@/utils/functional';

import { Container } from './styled';

export interface InputProps extends Merge<React.ComponentProps<typeof Container>, ControlProps<string>> {}

const Input: React.FC<InputProps> = ({ onValueChange, onChange, ...props }) => {
  const handleChange = chain(onChange, (event) => onValueChange(event.target.value));

  return <Container {...props} onChange={handleChange} />;
};

/**
 * A text input form control.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/core-input--default}
 */
export default Object.assign(Input, {
  Controlled: createControlled(Input, { defaultValue: '' }),
  Container,
});
