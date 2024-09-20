import Button from '@/components/Button';

import { Container } from './styled';

export interface PromptOptionProps extends React.ComponentProps<typeof Button.Primary> {
  /**
   * The label that will appear on the action button.
   */
  label: string;
}

export interface PromptProps {
  /**
   * Configuration for the "accept" action.
   */
  accept: PromptOptionProps;

  /**
   * Configuration for the "cancel" action.
   */
  cancel: PromptOptionProps;
}

const Prompt: React.FC<PromptProps> = ({ accept, cancel }) => (
  <Container>
    <Button.Primary tabIndex={-1} {...accept}>
      {accept.label}
    </Button.Primary>
    <Button type="subtle" tabIndex={-1} {...cancel}>
      {cancel.label}
    </Button>
  </Container>
);

/**
 * A popup that prompts the user with cancel and accept actions.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-chat-prompt--default}
 */
export default Object.assign(Prompt, {
  Container,
});
