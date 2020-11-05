/**
 * 创建 sitemap 文件
 * https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/sitemap.html
 */
const path = require('path')
const fs = require('fs')

const srcDir = path.resolve(__dirname, '../src')
const distDir = path.resolve(__dirname, '../dist')

function addSitemapFile() {
  const file = 'sitemap.json'
  try {
    fs.copyFileSync(path.resolve(srcDir, file), path.resolve(distDir, file))
  } catch (e) {
    console.log(`拷贝 ${file} 错误: `, e)
  }
}

export default function plugin(ctx) {
  ctx.onBuildFinish(() => {
    addSitemapFile()
  })
}
