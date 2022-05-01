/*
 * @Author: Salt
 * @Date: 2022-04-30 16:03:42
 * @LastEditors: Salt
 * @LastEditTime: 2022-05-01 13:10:13
 * @Description: 检查垃圾内容会用到的方法
 * @FilePath: \better-tieba\src\modules\antiSpam\method.ts
 */
import {
  titleList,
  contentList,
  ADVERTIS,
  SALACITY,
  SWEARING,
  vetReg,
  titleReg,
  decodeMap,
} from './constant'
/** 获得页面中的主题帖标题元素 */
export function getTitleList() {
  return document.body.$$(titleList.join(','))
}
/** 获得页面中的帖子内容元素 */
export function getContentList() {
  return document.body.$$(contentList.join(','))
}

export function txtTest(txt: string, regs: RegExp[]): boolean {
  return regs.some((reg) => reg.test(txt))
}
/** 标题检查 */
export function checkTitle(_txt: string): number {
  if (!_txt) return 0
  let txt = _txt
  for (const [code, decode] of decodeMap) {
    txt = txt.split(code).join(decode)
  }
  if (txtTest(txt, titleReg)) return ADVERTIS
  if (txtTest(txt, vetReg[ADVERTIS])) return ADVERTIS
  if (txtTest(txt, vetReg[SALACITY])) return SALACITY
  if (txtTest(txt, vetReg[SWEARING])) return SWEARING
  return 0
}
/** 内容检查 */
export function checkContent(txt: string): number {
  if (!txt) return 0
  if (txtTest(txt, vetReg[ADVERTIS])) return ADVERTIS
  if (txtTest(txt, vetReg[SALACITY])) return SALACITY
  if (txtTest(txt, vetReg[SWEARING])) return SWEARING
  return 0
}
