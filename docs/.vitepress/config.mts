import { defineConfig } from 'vitepress'

const REPO = 'evansrrr/free-v6'
const GH_PROXY = 'https://gh-proxy.com/'

/**
 * 构建时通过 gh-proxy 抓取最新 release 的 version.json（与 FreeV6 客户端
 * 的更新检测同一地址）。抓取失败（离线构建、代理不可用）时使用下面的兜底
 * 值，保证构建不依赖网络。发版后无需手动更新本文件，但建议顺手核对兜底值。
 */
const fallback = {
  version: '0.4.5',
  tag: 'v0.4.5',
  setup: 'FreeV6_0.4.5_x64-setup.exe',
  download: `https://github.com/${REPO}/releases/download/v0.4.5/FreeV6_0.4.5_x64-setup.exe`,
  sha256: '17b99117b505e1b293aac85e2107b80ca9000c6003de6eae953242b8f67a784d'
}

async function loadLatest(): Promise<typeof fallback> {
  try {
    const res = await fetch(
      `${GH_PROXY}https://github.com/${REPO}/releases/latest/download/version.json`,
      { signal: AbortSignal.timeout(8000) }
    )
    if (res.ok) {
      const j = (await res.json()) as Record<string, string>
      if (j.version && j.setup && j.download) {
        return {
          version: j.version,
          tag: j.tag || `v${j.version}`,
          setup: j.setup,
          download: j.download,
          sha256: j.sha256 || ''
        }
      }
    }
  } catch {
    // 离线或代理不可用：走兜底值
  }
  return fallback
}

const freev6 = await loadLatest()

export default defineConfig({
  lang: 'zh-CN',
  title: 'FreeV6',
  description: '教育网通用 IPv6 免流客户端官方文档',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'FreeV6：教育网通用 IPv6 免流客户端' }],
    ['meta', { property: 'og:description', content: 'FreeV6 官方文档：下载安装、使用说明、常见问题与协议条款' }],
    ['meta', { name: 'theme-color', content: '#121318' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: "首页", link: "/" },
      { text: '使用指南', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: '下载', link: '/download', activeMatch: '/download' },
      {
        text: '关于',
        items: [
          { text: '用户协议与免责声明', link: '/about/agreement' },
          { text: '隐私政策', link: '/about/privacy' },
          { text: '更新日志', link: '/about/changelog' }
        ]
      },
      { text: '开发', link: '/develop' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: 'FreeV6 介绍', link: '/guide/introduction' },
            { text: '安装', link: '/guide/install' },
            { text: '使用说明', link: '/guide/usage' },
            { text: '常见问题', link: '/guide/faq' }
          ]
        }
      ],
      '/download': [
        {
          text: '获取 FreeV6',
          items: [
            { text: '下载', link: '/download' },
            { text: '安装', link: '/guide/install' },
            { text: '常见问题', link: '/guide/faq' }
          ]
        }
      ],
      '/about/': [
        {
          text: '关于',
          items: [
            { text: '用户协议与免责声明', link: '/about/agreement' },
            { text: '隐私政策', link: '/about/privacy' },
            { text: '更新日志', link: '/about/changelog' }
          ]
        }
      ]
    },
    outline: { label: '本页目录', level: [2, 3] },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'esc'
            }
          }
        }
      }
    },
    socialLinks: [{ icon: 'github', link: `https://github.com/${REPO}` }],
    footer: {
      message: 'FreeV6 by <a href="https://ich.cc.cd">Raziore</a>',
      copyright: 'Released under MIT & CC BY-NC-SA 4.0'
    },
    lastUpdatedText: '最后更新于',
    docFooter: { prev: '上一页', next: '下一页' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    freev6: {
      ...freev6,
      ghProxy: GH_PROXY,
      repo: REPO,
      releases: `https://github.com/${REPO}/releases`
    }
  },
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' }
  }
})
