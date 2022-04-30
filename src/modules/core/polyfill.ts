/*
 * @Author: Salt
 * @Date: 2022-01-22 00:13:05
 * @LastEditors: Salt
 * @LastEditTime: 2022-04-30 13:40:02
 * @Description: 提供垫片功能
 * @FilePath: \better-tieba\src\modules\core\polyfill.ts
 */

import h from 'Utils/h'
import { extend } from 'Utils/utils'

// https://polyfill.io/v3/polyfill.min.js
export default function () {
  const polyFillScript = h('script', {
    src: 'https://polyfill.io/v3/polyfill.min.js',
  })
  document.body.appendChild(polyFillScript)
  extend(Element.prototype, {
    $: function (this: Element, selectors: any) {
      return this.querySelector(selectors)
    },
    $$: function (this: Element, selectors: any) {
      return Array.from(this.querySelectorAll(selectors))
    },
  })
}
