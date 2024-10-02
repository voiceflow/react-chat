import chroma from 'chroma-js';

// TODO: These shades don't match exactly the figma colors
// TODO: Need to sit with Mike about these.
export const createColorPalette = (primary: string) => ({
  50: chroma(primary).brighten(2.5).hex(),
  100: chroma(primary).brighten(2).hex(),
  200: chroma(primary).brighten(1.5).hex(),
  300: chroma(primary).brighten(1).hex(),
  400: chroma(primary).brighten(0.5).hex(),
  500: primary,
  600: chroma(primary).darken(0.5).hex(),
  700: chroma(primary).darken(1).hex(),
  800: chroma(primary).darken(1.5).hex(),
  900: chroma(primary).darken(2).hex(),
});

export const createPalette = (baseColor: string) => {
  const hue = chroma(baseColor).get('hsl.h');

  const lightColor = chroma.hsl(hue, 1, 0.85).hex();

  const darkColor = chroma.hsl(hue, 1, 0.15).hex();

  const shades = chroma.scale([lightColor, baseColor, darkColor]).mode('hsl').colors(10);

  return {
    50: lightColor,
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
  100: '#656D75',
  600: '#2B3239',
  900: '#1A1E23',
  9006: '#191D220F',
  90012: '#1A1E231F',
};

export const COLORS = {
  white: '#fff',
  NEUTRAL_DARK,
};
