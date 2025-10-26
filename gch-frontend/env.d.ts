interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'vite' {
  export function defineConfig<T>(config: T): T
}

declare module '@vitejs/plugin-react' {
  const plugin: () => unknown
  export default plugin
}
