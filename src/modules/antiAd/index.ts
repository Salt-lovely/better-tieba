/*
 * @Author: Salt
 * @Date: 2022-01-19 23:13:34
 * @LastEditors: Salt
 * @LastEditTime: 2022-03-13 23:01:35
 * @Description: 反广告功能入口文件
 * @FilePath: \better-tieba\src\modules\antiAd\index.ts
 */

import h from '../../utils/h'
import { setSetting } from '../core/settings'

/** 反广告功能入口方法 */
export default function () {
  const antiAdStyle = h('style', {
    textContent: `/* 反广告功能 */
/* 顶部广告（少见） */
.head_ad_pop,
/* 左侧跟随广告 */
body > div.clearfix:not(.wrap1),
/* 吧内右侧广告 */
#aside .fengchao-wrap,
#aside [id^="mediago-"],
#aside .lu-frs-wrapper iframe,
/* 吧内主题帖间插入广告 */
#thread_list > .fengchao-wrap-feed,
#thread_list > [id^="mediago-"],
/* 主题帖内右侧广告 */
#mediago-tb-pb-list-aside,
.right_section .lu-pb-wrapper iframe,
/* 主题帖内楼层间插入广告 */
#j_p_postlist [id^="mediago-"],
/* 下载手机应用 */
.tbui_aside_fbar_button.tbui_fbar_down,
.app_download_box,
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
  }
  setSetting({
    type: 'switch',
    title: '隐藏贴吧广告',
    key: 'anti-ad-basic',
    callback: setAntiAd,
    defaultValue: true,
  })
}
