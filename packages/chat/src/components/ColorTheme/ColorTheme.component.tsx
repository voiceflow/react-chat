import { createPalette } from '@/styles/colors';

import { container, derivativeColor, derivativeColorContainer, primaryColorBlock } from './ColorTheme.css';

export const ColorTheme = ({ color }: { color: string }) => {
  const bezier = createPalette(color);
  return (
    <div className={container}>
      <div className={primaryColorBlock} style={{ backgroundColor: bezier[500] }}>
        <h2>500</h2>
        <span>{bezier[500]}</span>
      </div>
      <div className={derivativeColorContainer}>
        {Object.entries(bezier).map(([key, value]) => (
          <div key={key} className={derivativeColor} style={{ backgroundColor: value }}>
            <h2>{key}</h2>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
