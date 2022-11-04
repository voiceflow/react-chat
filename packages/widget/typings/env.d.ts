/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WIDGET_URL: string;
  readonly CIRCLE_SHA1?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
