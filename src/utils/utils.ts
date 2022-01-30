/*
 * @Author: Salt
 * @Date: 2022-01-26 00:03:14
 * @LastEditors: Salt
 * @LastEditTime: 2022-01-30 12:29:19
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

export function extend<T extends object, K extends Partial<T>>(
  obj: T,
  ext: K
): T {
  for (const key in ext) {
    if (!(key in obj)) {
      Object.defineProperty(obj, key, {
        value: ext[key],
        enumerable: false,
      })
    }
  }
  return obj
}
