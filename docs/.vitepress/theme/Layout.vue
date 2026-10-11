<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import TunnelPanel from './components/TunnelPanel.vue'
import DownloadStrip from './components/DownloadStrip.vue'

const { frontmatter } = useData()
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-image>
      <TunnelPanel v-if="frontmatter.layout === 'home'" />
    </template>
    <template #home-features-after>
      <DownloadStrip v-if="frontmatter.layout === 'home'" />
    </template>
  </DefaultTheme.Layout>
</template>
