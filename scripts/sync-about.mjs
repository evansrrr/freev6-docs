/**
 * 从 free-v6 仓库 main 分支拉取正本文档到 docs/about/，
 * 使更新日志、用户协议、隐私政策无需手动同步。
 *
 * 构建时自动执行（package.json 的 build 脚本），拉取失败时保留
 * 仓库内现有文件并继续构建，因此离线构建不受影响。
 *
 * 手动执行：npm run sync
 */
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = 'evansrrr/free-v6'
const BRANCH = 'main'
const FILES = [
  ['CHANGELOG.md', 'docs/about/changelog.md'],
  ['docs/agreement.md', 'docs/about/agreement.md'],
  ['docs/privacy.md', 'docs/about/privacy.md']
]

const rawUrl = (src) => `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${src}`
const proxyUrl = (src) => `https://gh-proxy.com/${rawUrl(src)}`

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

async function fetchText(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const text = await res.text()
  // 防止代理层返回 200 的 HTML 错误页覆盖正文
  if (!text.trim() || text.includes('<html')) throw new Error('unexpected body')
  return text
}

let updated = 0
let failed = 0

for (const [src, dest] of FILES) {
  let text = null
  for (const url of [rawUrl(src), proxyUrl(src)]) {
    try {
      text = await fetchText(url)
      break
    } catch (err) {
      console.warn(`[sync] ${url} -> ${err.message}`)
    }
  }
  if (text === null) {
    console.warn(`[sync] ${src}: 拉取失败，保留现有 ${dest}`)
    failed += 1
    continue
  }
  await writeFile(path.join(root, dest), text, 'utf8')
  updated += 1
  console.log(`[sync] ${src} -> ${dest} (${text.length} chars)`)
}

console.log(`[sync] done: ${updated} updated, ${failed} failed`)
