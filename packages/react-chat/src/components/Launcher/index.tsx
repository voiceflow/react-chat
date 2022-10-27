import React from 'react';

import launch from './launch.svg';
import { Button } from './styled';

export interface LauncherProps {
  image?: string | undefined;
  open: VoidFunction;
}

const Launcher: React.FC<LauncherProps> = ({ image, open }) => {
  return (
    <Button onClick={open}>
      <img src={image || launch} alt="launch" />
    </Button>
  );
};

export default Launcher;
