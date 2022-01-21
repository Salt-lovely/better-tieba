/*
 * @Author: Salt
 * @Date: 2022-01-22 00:08:56
 * @LastEditors: Salt
 * @LastEditTime: 2022-01-22 00:14:43
 * @Description: 核心功能
 * @FilePath: \better-tieba\src\modules\core\index.ts
 */
import polyfill from './polyfill'

/** 核心功能入口方法 */
export default function () {
  polyfill() // 首先执行垫片功能，兼容低版本浏览器，当然 IE 这种就别想了
}
