<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFreev6 } from './useFreev6'

const f6 = useFreev6()
const proxied = computed(() => `${f6.value.ghProxy}${f6.value.download}`)

const copied = ref(false)
async function copySha() {
  try {
    await navigator.clipboard.writeText(f6.value.sha256)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // 剪贴板不可用时忽略：用户仍可手动选择复制
  }
}
</script>

<template>
  <div class="dl">
    <div class="head">
      <span class="ver">v{{ f6.version }}</span>
      <code class="file">{{ f6.setup }}</code>
    </div>

    <div class="acts">
      <a class="btn primary" :href="proxied">加速下载（推荐）</a>
      <a class="btn" :href="f6.download">官方直链</a>
      <a class="btn" :href="f6.releases" target="_blank" rel="noopener">Releases 页面</a>
    </div>

    <div v-if="f6.sha256" class="sha">
      <span class="label">SHA256</span>
      <code class="value">{{ f6.sha256 }}</code>
      <button type="button" class="copy" @click="copySha">
        {{ copied ? '已复制' : '复制' }}
      </button>
    </div>

    <p class="note">
      适用于 Windows 11 x64。首次点击“启动免流”时会下载运行核心（约 21 MB），同样走加速通道。
    </p>
  </div>
</template>

<style scoped>
.dl {
  margin: 24px 0;
  padding: 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg-elv);
}

.head {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.ver {
  padding: 3px 12px;
  border-radius: 999px;
  font-family: var(--vp-font-family-heading);
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.file {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-2);
  overflow-wrap: anywhere;
}

.acts {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

.btn {
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}

.btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.btn.primary {
  border-color: transparent;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}

.btn.primary:hover {
  background: var(--vp-c-brand-2);
  color: var(--vp-c-bg);
}

.sha {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px dashed var(--vp-c-divider);
}

.sha .label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-3);
}

.sha .value {
  flex: 1;
  min-width: 260px;
  font-family: var(--vp-font-family-mono);
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  overflow-wrap: anywhere;
}

.copy {
  height: 30px;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: transparent;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;
}

.copy:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.note {
  margin: 16px 0 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--vp-c-text-3);
}
</style>
