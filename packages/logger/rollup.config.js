import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import license from 'rollup-plugin-license'
import hardLinkSdk from './rollup-plugin-hard-link-sdk'
import pkg from './package.json'

const versionInfo = `
@mp-logger/logger v${pkg.version} (https://github.com/Barrior/mp-logger)
Released under the MIT License.
`

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.js',
      format: 'umd',
      esModule: false,
      name: 'mpLogger',
    },
    {
      file: 'lib/index.min.js',
      format: 'umd',
      esModule: false,
      name: 'mpLogger',
      plugins: [
        terser({
          output: {
            comments: false,
          },
        }),
        hardLinkSdk(),
      ],
    },
  ],
  watch: {
    buildDelay: 1000,
    include: ['src/**', 'types/**'],
  },
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs(),
    license({
      banner: {
        content: versionInfo.trim(),
        commentStyle: 'ignored',
      },
    }),
  ],
}
