import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
import React from 'react';

import { ClassName } from '@/constants';

import Button from '../Button';
import { ChevronIcon } from './ChevronIcon';
import { PlayIcon } from './PlayIcon';
import { launcherIconStyles, launcherLabelStyles, launcherStyles } from './styles.css';

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

const Launcher: React.FC<LauncherProps> = ({ image, isOpen, label, onClick }) => {
  const withLabel = !!label?.length;
  return (
    <Button className={clsx(ClassName.LAUNCHER, launcherStyles({ withLabel }))} onClick={onClick}>
      {withLabel && <div className={launcherLabelStyles}>{label}</div>}
      {image && !isOpen && <img src={image} className={launcherIconStyles({ withLabel })} alt="launch" />}
      {!image && !isOpen && <PlayIcon className={launcherIconStyles({ withLabel })} />}
      {isOpen && <ChevronIcon className={launcherIconStyles()} />}
    </Button>
  );
};

/**
 * A floating action button used to launch the chat widget.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-launcher--default}
 */
export default Launcher;
