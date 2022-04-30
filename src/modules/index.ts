/*
 * @Author: Salt
 * @Date: 2022-01-19 23:09:27
 * @LastEditTime: 2022-04-30 15:18:21
 * @LastEditors: Salt
 * @Description: 各个模块统筹规划
 */
import core from './core'
import antiAd from './antiAd'
import moderator from './moderator'
import antiSpam from './antiSpam'

core() // 必须先加载核心功能

/** 调用后加载各个模块 */
export default function () {
  antiAd()
  moderator()
  antiSpam()
}
