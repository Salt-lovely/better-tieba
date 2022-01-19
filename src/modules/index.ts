/*
 * @Author: Salt
 * @Date: 2022-01-19 23:09:27
 * @LastEditTime: 2022-01-19 23:23:43
 * @LastEditors: Salt
 * @Description: 各个模块统筹规划
 */

import antiAd from './antiAd'
import moderator from './moderator'

/** 调用后加载各个模块 */
export default function () {
  antiAd()
  moderator()
}
