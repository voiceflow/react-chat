import Button from '@/components/Button';

import { Container } from './styled';

export interface PromptOptionProps extends React.ComponentProps<typeof Button.Primary> {
  label: string;
}

export interface PromptProps {
  accept: PromptOptionProps;
  cancel: PromptOptionProps;
}

const Prompt: React.FC<PromptProps> = ({ accept, cancel }) => (
  <Container>
    <Button.Primary {...accept}>{accept.label}</Button.Primary>
    <Button type="subtle" {...cancel}>
      {cancel.label}
    </Button>
  </Container>
);

export default Object.assign(Prompt, {
  Container,
});
