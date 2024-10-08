import chroma from 'chroma-js';

const defaultPrimary = '#387dff';

export const createPalette = (baseColor: string = defaultPrimary) => {
  const [h, s] = chroma(baseColor).hsl();

  const shades = [];

  for (let i = 10; i >= 0; i--) {
    const newL = 10 * i === 100 ? 95 : 10 * i || 5;
    shades.push(chroma.hsl(h, s, newL / 100).hex());
  }

  return {
    50: shades[0],
    100: shades[1],
    200: shades[2],
    300: shades[3],
    400: shades[4],
    500: baseColor,
    600: shades[6],
    700: shades[7],
    800: shades[8],
    900: shades[9],
  };
};

const NEUTRAL_DARK = {
  50: '#30373F',
  100: '#656D75',
  500: '#30373F',
  600: '#2B3239',
  700: '#252B31',
  900: '#1A1E23',
  9006: '#191D220F',
  9008: '#191d2214',
  90012: '#1A1E231F',
  90020: '#1A1E2333',
};

const NEUTRAL_LIGHT = {
  50: '#F1F1F2',
};

export const COLORS = {
  white: '#fff',
  NEUTRAL_DARK,
  NEUTRAL_LIGHT,
};
