import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import TunnelPanel from './components/TunnelPanel.vue'
import DownloadPanel from './components/DownloadPanel.vue'
import DownloadStrip from './components/DownloadStrip.vue'
import '@fontsource-variable/manrope'
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/jetbrains-mono'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('TunnelPanel', TunnelPanel)
    app.component('DownloadPanel', DownloadPanel)
    app.component('DownloadStrip', DownloadStrip)
  }
} satisfies Theme
