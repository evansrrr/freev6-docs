<script setup lang="ts">
import { computed } from 'vue'
import { useFreev6 } from './useFreev6'

const f6 = useFreev6()
const proxied = computed(() => `${f6.value.ghProxy}${f6.value.download}`)
</script>

<template>
  <section class="strip">
    <div class="inner">
      <div class="copy">
        <h2>下载慢？给 GitHub 链接加个前缀</h2>
        <p>
          安装包托管在 GitHub Releases。直连较慢时，在任意 GitHub
          地址前加上 <code>{{ f6.ghProxy }}</code> 即可加速——客户端内置的下载与更新走的也是这条路。
        </p>
      </div>
      <div class="acts">
        <a class="btn primary" :href="proxied">下载 v{{ f6.version }}（加速）</a>
        <a class="btn" :href="f6.releases" target="_blank" rel="noopener">全部 Release</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.strip {
  margin-top: 8px;
  padding: 40px 0;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

.copy {
  min-width: 0;
}

h2 {
  margin: 0 0 8px;
  font-family: var(--vp-font-family-heading);
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
}

p {
  margin: 0;
  max-width: 620px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

code {
  padding: 2px 6px;
  border-radius: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 12.5px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.acts {
  display: flex;
  flex: none;
  gap: 12px;
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
  white-space: nowrap;
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

@media (max-width: 768px) {
  .inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .acts {
    flex-wrap: wrap;
  }
}
</style>
