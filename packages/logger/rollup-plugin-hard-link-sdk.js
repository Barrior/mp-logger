import path from 'path'
import { execSync } from 'child_process'

const sourceFile = path.resolve(__dirname, 'lib/index.min.js')
const targetFile = path.resolve(__dirname, '../server/public/js/sdk.min.js')

/**
 * 将编译完成的 index.min.js 硬链接到 packages/server/public/js/sdk.min.js
 */
export default function hardLinkSdk() {
  return {
    name: 'hardLinkSdk',
    writeBundle(options, bundle) {
      // 忽略错误的调用
      if (!bundle['index.min.js']) return

      try {
        // fs.linkSync 不能强制覆盖，故使用 ln 命令
        execSync(`ln -f ${sourceFile} ${targetFile}`)
      } catch (e) {
        console.warn('Hard link SDK file error: ', e)
      }
    },
  }
}
