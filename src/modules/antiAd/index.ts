/*
 * @Author: Salt
 * @Date: 2022-01-19 23:13:34
 * @LastEditors: Salt
 * @LastEditTime: 2022-01-26 00:00:32
 * @Description: 反广告功能入口文件
 * @FilePath: \better-tieba\src\modules\antiAd\index.ts
 */

import h from '../../utils/h'
import { setSetting } from '../core/settings'

/** 反广告功能入口方法 */
export default function () {
  const antiAdStyle = h('style', {
    id: 'asdf',
    textContent: `/* 反广告功能 */
/* 左侧跟随广告 */
body > div.clearfix:not(.wrap1),
/* 吧内右侧广告 */
#aside .fengchao-wrap,
/* 吧内主题帖间插入广告 */
#thread_list .fengchao-wrap-feed,
/* 主题帖内右侧广告 */
#mediago-tb-pb-list-aside,
/* 主题帖内楼层间插入广告 */
#j_p_postlist [id^="mediago-"],
/* 下载手机应用 */
.tbui_aside_fbar_button.tbui_fbar_down,
/* 其他可能需要检测的广告 */
.salt-marked-ad {
    height: 0 !important;
    width: 0 !important;
    overflow: hidden !important;
    filter: opacity(0) !important;
    pointer-events: none !important;
}
`,
  })
  const setAntiAd = (enable: boolean) => {
    if (enable) document.head.appendChild(antiAdStyle)
    else antiAdStyle.parentElement?.removeChild(antiAdStyle)
    console.log('antiAdStyle', antiAdStyle)
  }
  setSetting({
    type: 'switch',
    title: '',
    key: 'anti-ad-basic',
    callback: setAntiAd,
    defaultValue: true,
  })
}
