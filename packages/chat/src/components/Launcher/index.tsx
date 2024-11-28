import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
import React from 'react';

import { ClassName } from '@/constants';

import { Button } from '../Button';
import { ChevronIcon } from './ChevronIcon';
import { PlayIcon } from './PlayIcon';
import {
  closeChevron,
  iconContainer,
  imageStyles,
  launcherContainer,
  launcherIconStyles,
  launcherLabelStyles,
  launcherStyles,
  playIconStyles,
} from './styles.css';

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
  onClick: MouseEventHandler<HTMLDivElement>;
}

/**
 * A floating action button used to launch the chat widget.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-launcher--default}
 */
export const Launcher: React.FC<LauncherProps> = ({ image, isOpen, label, onClick }) => {
  const withLabel = !!label?.length;
  return (
    <div className={launcherContainer} onClick={onClick}>
      <Button className={clsx(ClassName.LAUNCHER, launcherStyles({ withLabel, isOpen }))}>
        <div className={iconContainer({ isOpen, withLabel })}>
          <ChevronIcon className={clsx(closeChevron({ isOpen, withLabel }), launcherIconStyles())} />
          {image && (
            <img
              src={image}
              className={clsx(imageStyles({ isOpen, withLabel }), playIconStyles({ withLabel }))}
              alt="open chat"
            />
          )}
          {!image && <PlayIcon className={playIconStyles({ withLabel, isOpen })} />}
        </div>
        {withLabel && <div className={launcherLabelStyles({ isOpen })}>{label} </div>}
      </Button>
    </div>
  );
};
