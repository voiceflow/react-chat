import { DEVICE_INFO } from '@/constants';

export const isIOS = () => DEVICE_INFO.os.name === 'iOS';

export const isBrave = () => {
  const browserNavigator = globalThis.navigator as Navigator & { brave?: { isBrave: () => boolean } };

  if (!browserNavigator) return false;

  if (browserNavigator.brave !== undefined) {
    return browserNavigator.brave.isBrave.name === 'isBrave';
  }

  return false;
};

export const isArc = () => !!getComputedStyle(document.documentElement).getPropertyValue('--arc-palette-title');
export const isEdge = () => DEVICE_INFO.browser.name === 'Microsoft Edge';
export const isOpera = () => DEVICE_INFO.browser.name === 'Opera';
export const isChrome = () => !isBrave() && !isArc() && DEVICE_INFO.browser.name === 'Chrome';
export const isSafari = () => DEVICE_INFO.browser.name === 'Safari';
export const isFirefox = () => DEVICE_INFO.browser.name === 'Firefox';
export const isChromium = () => isEdge() || isChrome() || isBrave() || isArc() || isOpera();
