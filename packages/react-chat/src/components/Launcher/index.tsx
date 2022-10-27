import React from 'react';

import { Button } from './styled';

export interface LauncherProps {
  image?: string | undefined;
  open: VoidFunction;
}

// we have to use an external image because svgs are not bundled in the package
const DEFAULT_LAUNCH = 'https://cdn.voiceflow.com/assets/launch.svg';

const Launcher: React.FC<LauncherProps> = ({ image, open }) => {
  return (
    <Button onClick={open}>
      <img src={image || DEFAULT_LAUNCH} alt="launch" />
    </Button>
  );
};

export default Launcher;
