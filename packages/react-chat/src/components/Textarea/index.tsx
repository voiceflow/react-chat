import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { TextareaAutosizeProps } from 'react-textarea-autosize';
import { Merge } from 'type-fest';

import { ControlProps, createControlled } from '@/utils/controls';
import { chain } from '@/utils/functional';

import { Container } from './styled';

export interface TextareaProps extends Merge<ControlProps<string>, Omit<TextareaAutosizeProps, 'value'>> {}

const Textarea: ForwardRefExoticComponent<TextareaProps & RefAttributes<HTMLTextAreaElement>> = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ onValueChange, onChange, rows = 1, ...props }, ref) => {
    const handleChange = chain(onChange, (event) => onValueChange(event.target.value));
    return <Container ref={ref} {...props} onChange={handleChange} minRows={1} maxRows={5} style={{ height: 42 }} />;
  }
);

/**
 * A textarea form control.
 */
export default Object.assign(Textarea, {
  Controlled: createControlled(Textarea as any, { defaultValue: '' }),
  Container,
});
