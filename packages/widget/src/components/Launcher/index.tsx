import React from 'react';

import launch from '../../assets/launch.svg';
import { Button } from './styled';

interface LauncherProps {
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
