import React, { MouseEventHandler } from 'react';

import launch from './launch.svg';
import { Button } from './styled';

export interface LauncherProps {
  /**
   * An image URL to be rendered as the icon.
   * Defaults to the "launch" SVG if not provided.
   */
  image?: string | undefined;

  /**
   * A callback that will be executed when the button is clicked.
   */
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Launcher: React.FC<LauncherProps> = ({ image, onClick }) => {
  return (
    <Button onClick={onClick}>
      <img src={image || launch} alt="launch" />
    </Button>
  );
};

/**
 * A floating action button used to launch the chat widget.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-launcher--default}
 */
export default Launcher;
