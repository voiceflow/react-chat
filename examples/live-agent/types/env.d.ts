/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VF_PROJECT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
