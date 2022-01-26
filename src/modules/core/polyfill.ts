/*
 * @Author: Salt
 * @Date: 2022-01-22 00:13:05
 * @LastEditors: Salt
 * @LastEditTime: 2022-01-26 22:09:18
 * @Description: 提供垫片功能
 * @FilePath: \better-tieba\src\modules\core\polyfill.ts
 */

import h from '../../utils/h'

// https://polyfill.io/v3/polyfill.min.js
export default function () {
  const polyFillScript = h('script', {
    src: 'https://polyfill.io/v3/polyfill.min.js',
  })
  document.body.appendChild(polyFillScript)
}
