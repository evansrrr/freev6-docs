import { computed } from 'vue'
import { useData } from 'vitepress'

/** 与 config.mts 兜底值一致，保证在数据缺失时页面依然可用 */
const DEFAULTS = {
  version: '0.4.5',
  tag: 'v0.4.5',
  setup: 'FreeV6_0.4.5_x64-setup.exe',
  download: '',
  sha256: '',
  ghProxy: 'https://gh-proxy.com/',
  repo: 'evansrrr/free-v6',
  releases: 'https://github.com/evansrrr/free-v6/releases'
}

export function useFreev6() {
  const { theme } = useData()
  return computed(() => ({
    ...DEFAULTS,
    ...((theme.value as Record<string, unknown> | undefined)?.freev6 as object)
  }))
}
