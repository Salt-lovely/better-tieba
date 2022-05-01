/*
 * @Author: Salt
 * @Date: 2022-05-01 12:47:46
 * @LastEditors: Salt
 * @LastEditTime: 2022-05-01 12:57:04
 * @Description: 这个文件的功能
 * @FilePath: \better-tieba\src\modules\antiAd\css.ts
 */

const hideList = [
  '.head_ad_pop', // 顶部广告（少见）
  'body > div.clearfix:not(.wrap1)', // 左侧跟随广告
  '.salt-marked-ad', // 其他可能需要检测的广告
  // 右侧广告
  '#fc-lu-ad, .fengchao-wrap', // fengchao 系列广告
  '#aside [id^="mediago-"]',
  '#mediago-tb-pb-list-aside',
  '.lu-frs-wrapper iframe', // 嵌入页面广告
  '.lu-pb-wrapper iframe',
  '.lu-home-wrapper iframe',
  // 吧内主题帖间插入广告
  '#thread_list > .fengchao-wrap-feed',
  '#thread_list > [id^="mediago-"]',
  // 主题帖内楼层间插入广告
  '#j_p_postlist [id^="mediago-"]',
  // 下载手机应用
  '.tbui_aside_fbar_button.tbui_fbar_down',
  '.app_download_box',
]

const css = `
/* 反广告功能 */${hideList.join(',\n')}{
  height: 0 !important;
  width: 0 !important;
  overflow: hidden !important;
  filter: opacity(0) !important;
  pointer-events: none !important;
}`

export default css
