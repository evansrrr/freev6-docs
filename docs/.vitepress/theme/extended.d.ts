export {}

declare module 'vitepress' {
  namespace DefaultTheme {
    interface Config {
      freev6?: {
        version: string
        tag: string
        setup: string
        download: string
        sha256: string
        ghProxy: string
        repo: string
        releases: string
      }
    }
  }
}
