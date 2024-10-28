import clsx from 'clsx';

import { Button } from '@/components/Button';
import { ClassName } from '@/constants';

import { ButtonVariant } from '../Button/constants';
import { chatOverlay, promptContainer } from './styles.css';

export interface PromptOptionProps extends React.ComponentProps<typeof Button> {
  /**
   * The label that will appear on the action button.
   */
  label: string;
}

export interface PromptProps {
  /**
   * Is the prompt visible.
   */
  visible: boolean;

  /**
   * Configuration for the "accept" action.
   */
  accept: PromptOptionProps;

  /**
   * Configuration for the "cancel" action.
   */
  cancel: PromptOptionProps;
}

/**
 * A popup that prompts the user with cancel and accept actions.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-chat-prompt--default}
 */
export const Prompt: React.FC<PromptProps> = ({ visible, accept, cancel }) => (
  <>
    <div className={clsx('overlay', chatOverlay({ visible }))}></div>
    <div className={clsx(ClassName.PROMPT, promptContainer({ visible }))}>
      <Button variant={ButtonVariant.PRIMARY} large tabIndex={-1} {...accept}>
        {accept.label}
      </Button>
      <Button variant={ButtonVariant.SECONDARY} large tabIndex={-1} {...cancel}>
        {cancel.label}
      </Button>
    </div>
  </>
);