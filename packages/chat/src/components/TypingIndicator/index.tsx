import clsx from 'clsx';

import { ClassName } from '@/constants';

import { dot, indicatorContainer } from './styles.css';

/**
 * An animated indicator to show that the system is preparing a response.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/docs/components-typingindicator--default}
 */
export const TypingIndicator: React.FC = () => (
  <span className={clsx(ClassName.TYPING_INDICATOR, indicatorContainer)}>
    <span className={dot({ dot: 'first' })} />
    <span className={dot({ dot: 'second' })} />
    <span className={dot({ dot: 'third' })} />
  </span>
);
