import { createPalette } from '@/styles/colors';

import { container, derivativeColor, derivativeColorContainer, primaryColorBlock } from './ColorTheme.css';

export const ColorTheme = ({ color }: { color: string }) => {
  const palette = createPalette(color);
  return (
    <div className={container}>
      <div className={primaryColorBlock} style={{ backgroundColor: color }}>
        <h2>500</h2>
        <span>{color}</span>
      </div>
      <div className={derivativeColorContainer}>
        {Object.entries(palette).map(([key, value]) => (
          <div key={key} className={derivativeColor} style={{ backgroundColor: value }}>
            <h2>{key}</h2>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
