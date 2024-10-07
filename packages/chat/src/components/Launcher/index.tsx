import type { MouseEventHandler } from 'react';
import React from 'react';

import Button from '../Button';
import launch from './launch.svg';
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
   * A callback that will be executed when the button is clicked.
   */
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Launcher: React.FC<LauncherProps> = ({ image, label, onClick }) => {
  const withLabel = !!label?.length;
  return (
    <Button className={launcherStyles({ withLabel })} onClick={onClick}>
      {label && <div className={launcherLabelStyles}>{label}</div>}
      <img src={image || launch} className={launcherIconStyles({ withLabel })} alt="launch" />
    </Button>
  );
};

/**
 * A floating action button used to launch the chat widget.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-launcher--default}
 */
export default Launcher;
