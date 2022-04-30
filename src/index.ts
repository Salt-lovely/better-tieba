/*
 * @Author: Salt
 * @Date: 2022-01-19 22:52:37
 * @LastEditTime: 2022-04-30 19:24:15
 * @LastEditors: Salt
 * @Description: 入口文件
 */
/*!

// ==UserScript==
// @name         盐的网页版贴吧体验优化脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  更好的贴吧看帖、管理体验
// @author       Salt
// @match        https://tieba.baidu.com/*
// @icon         https://www.google.com/s2/favicons?domain=baidu.com
// @grant        none
// @license      MulanPSL-2.0
// ==/UserScript==

*/
import modules from './modules'
import { docReady } from './utils/utils'

if (window.parent !== window)
  throw new Error('这个脚本不允许在 iframe 等嵌入页面中运行！')
else docReady(modules)
