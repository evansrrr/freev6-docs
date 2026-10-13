import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DownloadPanel from './components/DownloadPanel.vue'
import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'
import '@fontsource-variable/manrope'
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/jetbrains-mono'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DownloadPanel', DownloadPanel)
    inject()
    injectSpeedInsights()
  }
} satisfies Theme
