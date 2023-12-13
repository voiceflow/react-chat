import { TextareaAutosizeProps } from 'react-textarea-autosize';
import { Merge } from 'type-fest';

import { ControlProps, createControlled } from '@/utils/controls';
import { chain } from '@/utils/functional';

import { Container } from './styled';

export interface TextareaProps extends Merge<ControlProps<string>, TextareaAutosizeProps> {}

const Textarea: React.FC<TextareaProps> = ({ onValueChange, onChange, rows = 1, ...props }) => {
  const handleChange = chain(onChange, (event) => onValueChange(event.target.value));

  return <Container {...props} onChange={handleChange} minRows={1} maxRows={5} style={{ height: 42 }} />;
};

/**
 * A textarea form control.
 */
export default Object.assign(Textarea, {
  Controlled: createControlled(Textarea, { defaultValue: '' }),
  Container,
});
