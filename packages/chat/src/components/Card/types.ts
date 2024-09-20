import type { RuntimeAction } from '@voiceflow/sdk-runtime';

import type { Link } from './styled';

export interface CardActionProps {
  /**
   * The label that will appear on the button.
   */
  name: string;

  /**
   * the request that will be sent by the runtime when the button is clicked.
   */
  request: RuntimeAction;
}

export interface CardProps {
  /**
   * The title of the card.
   */
  title: string;

  /**
   * Text content of the card.
   * If the string is a valid URL it will be rendered in a {@link Link}.
   */
  description: string;

  /**
   * An image URL that will render at the top of the card if provided.
   */
  image?: string | undefined | null;

  /**
   * A list of actions that will appear as button controls at the bottom of the card.
   */
  actions?: CardActionProps[] | undefined;
}
