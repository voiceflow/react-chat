import { fontFace } from '@vanilla-extract/css';

const CDN_ASSETS = 'https://cdn.voiceflow.com/widget-next';

export const defaultFontFace = fontFace([
  {
    src: `
      url('${CDN_ASSETS}/UCityProWeb-Regular.woff') format('woff'),
      url('${CDN_ASSETS}/UCityProWeb-Regular.woff2') format('woff2')`,
    fontWeight: 400,
  },
  {
    src: `
      url('${CDN_ASSETS}/UCityProWeb-Semibold.woff') format('woff'),
      url('${CDN_ASSETS}/UCityProWeb-Semibold.woff2') format('woff2')`,
    fontWeight: 600,
  },
  {
    src: `
      url('${CDN_ASSETS}/UCityProWeb-Bold.woff') format('woff'),
      url('${CDN_ASSETS}/UCityProWeb-Bold.woff2') format('woff2')`,
    fontWeight: 700,
  },
]);
