import { fontFace } from '@vanilla-extract/css';

const CDN_ASSETS_DIR = 'https://cdn.voiceflow.com/widget-next';

export const defaultFont = fontFace([
  {
    src: `
      local("UCityProWeb"),
      url("${CDN_ASSETS_DIR}/UCityProWeb-Regular.woff") format("woff"),
      url("${CDN_ASSETS_DIR}/UCityProWeb-Regular.woff2") format("woff2");
    `,
    fontWeight: 400,
  },
  {
    src: `
      local("UCityProWeb"),
      url("${CDN_ASSETS_DIR}/UCityProWeb-Semibold.woff") format("woff"),
      url("${CDN_ASSETS_DIR}/UCityProWeb-Semibold.woff2") format("woff2");
    `,
    fontWeight: 600,
  },
  {
    src: `
      local("UCityProWeb"),
      url("${CDN_ASSETS_DIR}/UCityProWeb-Bold.woff") format("woff"),
      url("${CDN_ASSETS_DIR}/UCityProWeb-Bold.woff2") format("woff2");
    `,
    fontWeight: 700,
  },
]);
