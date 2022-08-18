import { Merge } from 'type-fest';

import { ControlProps, createControlled } from '@/utils/controls';
import { chain } from '@/utils/functional';

import { Container } from './styled';

export interface InputProps extends Merge<React.ComponentProps<typeof Container>, ControlProps<string>> {}

const Input: React.FC<InputProps> = ({ onValueChange, onChange, ...props }) => (
  <Container {...props} onChange={chain(onChange, (event) => onValueChange(event.target.value))} />
);

export default Object.assign(Input, {
  Controlled: createControlled(Input, ''),
  Container,
});
