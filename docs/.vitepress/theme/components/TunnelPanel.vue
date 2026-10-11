<script setup lang="ts">
import { onMounted, ref } from 'vue'

const on = ref(false)
const ready = ref(false)

onMounted(() => {
  // 直接置位即可触发 CSS 过渡；不依赖 requestAnimationFrame，
  // 避免页面处于非激活状态时 rAF 不触发导致面板停在 opacity: 0
  ready.value = true
})
</script>

<template>
  <div class="tunnel" :class="{ on, ready }" role="group" aria-label="免流状态演示">
    <div class="head">
      <span class="status">
        <span class="dot" aria-hidden="true" />
        <span class="state">{{ on ? '免流中' : '未连接' }}</span>
      </span>
      <span class="chip">{{ on ? 'IPv6 通道' : '校园网计费' }}</span>
    </div>

    <div class="route">
      <div class="end">
        <span class="name">校园网</span>
        <span class="detail">IPv4 出口</span>
      </div>
      <div class="line" aria-hidden="true">
        <span class="packet" />
      </div>
      <div class="end right">
        <span class="name">IPv6 通道</span>
        <span class="detail addr">{{ on ? '2001:da8:…::/64' : '待连接' }}</span>
      </div>
    </div>

    <div class="foot">
      <div class="meter">
        <span class="label">{{ on ? '免流流量' : '校园网计费' }}</span>
        <span class="value">{{ on ? '0 B · 不计费' : '按学校策略计费' }}</span>
      </div>
      <button
        class="switch"
        type="button"
        role="switch"
        :aria-checked="on"
        :aria-label="on ? '停止免流（演示）' : '启动免流（演示）'"
        @click="on = !on"
      >
        <span class="knob" />
      </button>
    </div>

    <p class="hint">
      {{
        on
          ? '流量经 IPv6 通道转发，不计入校园网流量'
          : '点击开关，看看启动免流后的状态'
      }}
    </p>
  </div>
</template>

<style scoped>
.tunnel {
  width: min(100%, 420px);
  margin-inline: auto;
  padding: 22px 22px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg-elv);
  box-shadow: 0 18px 44px -28px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.6s cubic-bezier(0.2, 0, 0, 1),
    transform 0.6s cubic-bezier(0.2, 0, 0, 1),
    border-color 0.4s cubic-bezier(0.2, 0, 0, 1);
}

.tunnel.ready {
  opacity: 1;
  transform: none;
}

.tunnel.on {
  border-color: color-mix(in srgb, var(--f6-free) 45%, var(--vp-c-divider));
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  transition: background-color 0.4s cubic-bezier(0.2, 0, 0, 1);
}

.on .dot {
  background: var(--f6-free);
  box-shadow: 0 0 0 4px var(--f6-free-soft);
}

.state {
  font-family: var(--vp-font-family-heading);
  font-weight: 700;
  font-size: 15px;
  color: var(--vp-c-text-1);
}

.chip {
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  line-height: 1.6;
  color: var(--f6-meter);
  background: var(--f6-meter-soft);
  transition:
    color 0.4s cubic-bezier(0.2, 0, 0, 1),
    background-color 0.4s cubic-bezier(0.2, 0, 0, 1);
}

.on .chip {
  color: var(--f6-free);
  background: var(--f6-free-soft);
}

.route {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 26px;
}

.end {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.end.right {
  text-align: right;
  align-items: flex-end;
}

.end .name {
  font-family: var(--vp-font-family-heading);
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.end .detail {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.end .addr {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  transition: color 0.4s cubic-bezier(0.2, 0, 0, 1);
}

.on .end .addr {
  color: var(--f6-free);
}

.line {
  position: relative;
  flex: 1;
  height: 2px;
  border-radius: 2px;
  background: repeating-linear-gradient(
    90deg,
    var(--vp-c-divider) 0 6px,
    transparent 6px 12px
  );
  overflow: hidden;
  transition: background 0.4s cubic-bezier(0.2, 0, 0, 1);
}

.on .line {
  background: linear-gradient(
    90deg,
    var(--vp-c-divider),
    color-mix(in srgb, var(--f6-free) 70%, var(--vp-c-divider))
  );
}

.packet {
  position: absolute;
  top: 50%;
  left: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--f6-free);
  opacity: 0;
  transform: translate(-50%, -50%);
}

.on .packet {
  opacity: 1;
  animation: packet 1.8s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}

@keyframes packet {
  0% {
    left: 0;
    opacity: 0;
  }
  12% {
    opacity: 1;
  }
  88% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

.foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;
}

.meter {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.meter .label {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.meter .value {
  font-family: var(--vp-font-family-heading);
  font-size: 15px;
  font-weight: 700;
  color: var(--f6-meter);
  transition: color 0.4s cubic-bezier(0.2, 0, 0, 1);
}

.on .meter .value {
  color: var(--f6-free);
}

.switch {
  position: relative;
  flex: none;
  width: 52px;
  height: 30px;
  padding: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition:
    background-color 0.4s cubic-bezier(0.2, 0, 0, 1),
    border-color 0.4s cubic-bezier(0.2, 0, 0, 1);
}

.switch:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.on .switch {
  background: var(--f6-free);
  border-color: var(--f6-free);
}

.knob {
  position: absolute;
  top: 50%;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
  transform: translate(0, -50%);
  transition: transform 0.4s cubic-bezier(0.2, 0, 0, 1);
}

.on .knob {
  transform: translate(22px, -50%);
}

.hint {
  min-height: 1.5em;
  margin: 16px 0 0;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .tunnel {
    margin-inline: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tunnel,
  .dot,
  .chip,
  .addr,
  .line,
  .meter .value,
  .switch,
  .knob {
    transition: none;
  }

  .on .packet {
    animation: none;
    left: 50%;
  }
}
</style>
