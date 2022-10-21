/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WIDGET_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
