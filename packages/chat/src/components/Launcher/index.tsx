import type { WidgetSettingsLauncherType } from '@voiceflow/dtos-interact';
import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
import React from 'react';

import { ClassName } from '@/constants';

import { Button } from '../Button';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ChevronIcon } from './ChevronIcon';
import { DEFAULT_ICON } from './constant';
import { LauncherWithLabel } from './LauncherWithLabel';
import { PhoneIcon } from './PhoneIcon';
import {
  closeChevron,
  closeIconStyles,
  iconContainer,
  imageStyles,
  launcherContainer,
  launcherIconStyles,
  launcherStyles,
  loadingSpinnerStyles,
} from './styles.css';

export { DEFAULT_ICON };

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

  /**
   * Flag to use the default phone icon.
   */
  isVoice?: boolean;

  /**
   * Flag to show loader in the launcher.
   */
  isLoading?: boolean;

  /**
   * Flag to disable the launcher.
   */
  isDisabled?: boolean;
}

/**
 * A floating action button used to launch the chat widget.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-launcher--default}
 */
export const Launcher: React.FC<LauncherProps> = ({
  image,
  type,
  isVoice,
  isOpen,
  label,
  onClick,
  isLoading = false,
  isDisabled = false,
}) => {
  const withIcon = type !== 'label';
  const withLabel = type !== 'icon' && !!label?.length;

  if (withLabel) {
    return (
      <LauncherWithLabel
        image={image}
        label={label}
        isOpen={isOpen}
        onClick={onClick}
        isVoice={isVoice}
        withIcon={withIcon}
      />
    );
  }

  const showDefaultPhoneIcon = !image && isVoice;

  return (
    <div className={launcherContainer} onClick={onClick}>
      <Button className={clsx(ClassName.LAUNCHER, launcherStyles({ isOpen, isDisabled, isLoading }))}>
        <div className={iconContainer({ isOpen, withIcon })}>
          <ChevronIcon className={clsx(closeChevron({ isOpen, isLoading }), closeIconStyles())} />

          {isLoading && <LoadingSpinner className={loadingSpinnerStyles} variant="light" size="large" />}

          {withIcon && (
            <>
              {showDefaultPhoneIcon && (
                <PhoneIcon className={clsx(imageStyles({ isOpen, isLoading }), launcherIconStyles({}))} fill="white" />
              )}

              {!showDefaultPhoneIcon && (
                <img
                  src={image ?? DEFAULT_ICON}
                  className={clsx(imageStyles({ isOpen, isLoading }), launcherIconStyles({}))}
                  alt="open chat"
                />
              )}
            </>
          )}
        </div>
      </Button>
    </div>
  );
};
