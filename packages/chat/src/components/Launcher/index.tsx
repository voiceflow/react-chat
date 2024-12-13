import type { WidgetSettingsLauncherType } from '@voiceflow/dtos-interact';
import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
import React from 'react';

import { ClassName } from '@/constants';

import { Button } from '../Button';
import { ChevronIcon } from './ChevronIcon';
import { LauncherWithLabel } from './LauncherWithLabel';
import {
  closeChevron,
  closeIconStyles,
  iconContainer,
  imageStyles,
  launcherContainer,
  launcherIconStyles,
  launcherStyles,
} from './styles.css';

export const DEFAULT_ICON = 'https://cdn.voiceflow.com/widget-next/message.png';

export interface LauncherProps {
  /**
   * The type of launcher we show.
   */
  type: WidgetSettingsLauncherType;

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
  onClick: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}

/**
 * A floating action button used to launch the chat widget.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-launcher--default}
 */
export const Launcher: React.FC<LauncherProps> = ({ image, type, isOpen, label, onClick }) => {
  const withIcon = type !== 'label';
  const withLabel = type !== 'icon' && !!label?.length;

  if (withLabel) {
    return (
      <LauncherWithLabel
        image={withIcon ? (image ?? DEFAULT_ICON) : undefined}
        isOpen={isOpen}
        label={label}
        onClick={onClick}
      />
    );
  }

  return (
    <div className={launcherContainer} onClick={onClick}>
      <Button className={clsx(ClassName.LAUNCHER, launcherStyles({ isOpen }))}>
        <div className={iconContainer({ isOpen, withIcon })}>
          <ChevronIcon className={clsx(closeChevron({ isOpen }), closeIconStyles())} />
          {withIcon && (
            <img
              src={image ?? DEFAULT_ICON}
              className={clsx(imageStyles({ isOpen }), launcherIconStyles({}))}
              alt="open chat"
            />
          )}
        </div>
      </Button>
    </div>
  );
};
