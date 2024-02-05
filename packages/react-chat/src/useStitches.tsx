import React, { createContext } from 'react';

export const StitchesContext = createContext<any>({} as any);

export const useStitches = () => {
  const stitchesData = React.useContext(StitchesContext);
  return stitchesData.value;
};
