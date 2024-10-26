import type { Nullish } from '@/types';

import type { HeaderProps } from '../Header';
import type { INewFooter } from '../NewFooter';
import type { IWelcomeMessage } from '../WelcomeMessage';

export interface INewChat extends HeaderProps, IWelcomeMessage, INewFooter, React.PropsWithChildren<unknown> {
  /**
   * If true, shows a loading indicator.
   */
  isLoading: boolean;

  /**
   * If true, shows audio interface controls.
   */
  audioInterface?: boolean;

  /**
   * A unix timestamp indicating the start of the conversation.
   */
  startTime?: Nullish<number>;

  /**
   * A callback that is executed when the chat widget is minimized.
   */
  onMinimize?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * A callback that is executed when the conversation ends.
   */
  onEnd?: React.MouseEventHandler<HTMLButtonElement>;
}
