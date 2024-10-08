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
  400: '#38414A',
  500: '#30373F',
  200: '#515A63',
  600: '#2B3239',
  700: '#252B31',
  900: '#1A1E23',
  9006: '#191D220F',
  9008: '#191d2214',
  90012: '#1A1E231F',
  90020: '#1A1E2333',
};

const NEUTRAL_LIGHT = {
  50: '#F1F2F2',
  100: '#E2E4E5',
  200: '#D4D7D7',
  300: '#C5C9CA',
  400: '#B7BCBD',
  500: '#A8AFB0',
  600: '#9AA1A3',
  700: '#8B9495',
  800: '#7D8688',
  900: '#6E797B',
};

const ACCENT = {
  50: '#E7F5FD',
  100: '#C6E4FB',
  200: '#A2D2FA',
  300: '#87BFFB',
  400: '#659FFD',
  500: '#397DFF',
  600: '#2F68DB',
  700: '#264EB4',
  800: '#1C368E',
  900: '#0F1E61',
};

const ALERT = {
  50: '#FCEBEF',
  100: '#FAE0E5',
  200: '#F7CED7',
  300: '#F1ABB9',
  400: '#EC889C',
  500: '#E6657F',
  600: '#DD4160',
  700: '#C62445',
  800: '#A01C37',
  900: '#741528',
};

const SUCCESS = {
  50: '#E7F6E2',
  100: '#CAE9BE',
  200: '#A8DB94',
  300: '#8ACD6F',
  400: '#68BE46',
  500: '#50A82E',
  600: '#449127',
  700: '#38751F',
  800: '#285417',
  900: '#1A390F',
};

const SHADES = {
  50: '#F2F7F7',
  100: '#EEF3F3',
  200: '#E8ECEC',
  300: '#E2E6E6',
  400: '#DBDEDE',
};

export const COLORS = {
  white: '#fff',
  NEUTRAL_DARK,
  NEUTRAL_LIGHT,
  ACCENT,
  ALERT,
  SUCCESS,
  SHADES,
};
