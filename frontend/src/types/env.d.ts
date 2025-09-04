/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL_PRODUCTION: string;
  readonly VITE_API_BASE_URL_DEVELOPMENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
