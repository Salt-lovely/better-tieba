/*
 * @Author: Salt
 * @Date: 2022-01-19 23:13:34
 * @LastEditors: Salt
 * @LastEditTime: 2022-05-01 12:50:43
 * @Description: 反广告功能入口文件
 * @FilePath: \better-tieba\src\modules\antiAd\index.ts
 */

import h from 'Utils/h'
import { setSetting } from '../core/settings'
import css from './css'

/** 反广告功能入口方法 */
export default function () {
  const antiAdStyle = h('style', {
    textContent: css,
  })
  const setAntiAd = (enable: boolean) => {
    if (enable) document.head.appendChild(antiAdStyle)
    else antiAdStyle.parentElement?.removeChild(antiAdStyle)
  }
  setSetting({
    type: 'switch',
    title: '隐藏贴吧广告',
    key: 'anti-ad-basic',
    callback: setAntiAd,
    defaultValue: true,
  })
}
