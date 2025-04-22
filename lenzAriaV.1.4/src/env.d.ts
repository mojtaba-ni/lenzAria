/// <reference types="vite/client" />

interface ImportMetaEnv {
    // more env variables...
    readonly VITE_BASE_URL: string
    readonly VITE_PORT: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }