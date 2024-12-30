/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VF_PROJECT_ID: string;
  readonly VF_RUNTIME_URL: string;
  readonly VF_VERSION_ID: string;
  readonly VF_ACCESS_TOKEN: string;
  readonly VF_RUNTIME_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
