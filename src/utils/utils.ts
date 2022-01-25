/*
 * @Author: Salt
 * @Date: 2022-01-26 00:03:14
 * @LastEditors: Salt
 * @LastEditTime: 2022-01-26 00:04:18
 * @Description: 杂项方法
 * @FilePath: \better-tieba\src\utils\utils.ts
 */

export function docReady(fn: () => unknown): void {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => fn())
  } else {
    fn()
  }
}
