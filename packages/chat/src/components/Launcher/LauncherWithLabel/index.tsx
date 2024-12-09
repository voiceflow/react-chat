import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
import React from 'react';

import { Button } from '@/components/Button';
import { ClassName } from '@/constants';

import { ChevronIcon } from '../ChevronIcon';
import { PlayIcon } from '../PlayIcon';
import { closeChevron, imageIconStyle, imageIconWrapper, launcherLabelStyles, launcherStyles } from './styles.css';

export interface LauncherProps {
  /**
   * An image URL to be rendered as the icon.
   * Defaults to the "launch" SVG if not provided.
   */
  image?: string | undefined;

  /**
   * A label that will be displayed on the launcher button.
   * If empty or undefined then the user will only see the icon.
   */
  label?: string | undefined;

  /**
   * Is the Chat widget opened ?
   * If it's opened then we only show the close icon.
   */
  isOpen: boolean;

  /**
   * A callback that will be executed when the button is clicked.
   */
  onClick: MouseEventHandler<HTMLButtonElement>;
}

/**
 * A floating action button used to launch the chat widget.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-launcher--default}
 */
export const LauncherWithLabel: React.FC<LauncherProps> = ({ image, isOpen, label, onClick }) => {
  return (
    <Button className={clsx(launcherStyles({ isOpen }), ClassName.LAUNCHER)} onClick={onClick}>
      <div className={imageIconWrapper}>
        {image ? (
          <img src={image} className={clsx(imageIconStyle({ isOpen }))} alt="open chat" />
        ) : (
          <PlayIcon className={imageIconStyle({ isOpen })} />
        )}
        <ChevronIcon className={clsx(closeChevron({ isOpen }))} />
      </div>
      <div className={launcherLabelStyles}>{label}</div>
    </Button>
  );
};
