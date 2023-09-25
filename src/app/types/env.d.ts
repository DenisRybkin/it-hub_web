/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_CACHE_TIME: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
