/*
 * @Author: Salt
 * @Date: 2022-03-13 23:23:39
 * @LastEditors: Salt
 * @LastEditTime: 2022-04-30 20:32:40
 * @Description: 检查垃圾内容功能
 * @FilePath: \better-tieba\src\modules\antiSpam\index.ts
 */

import h from 'Utils/h'
import { docReady, scrollYToEl } from 'Utils/utils'
import { setSetting } from '../core/settings'
import { checkedSign, classes, btnClasses, texts } from './constant'
import {
  checkContent,
  checkTitle,
  getContentList,
  getTitleList,
} from './method'
import { offStyle, onStyle } from './css'

/** 检查垃圾内容功能 */
export default function () {
  let canVet = false
  let isVetting = false
  let list: { el: Element; checkRes: number }[] = []
  const antiSpamStyle = h('style')
  const actionPanel = h('div', { id: 'salt-anti-spam-action-panel' })
  document.head.appendChild(antiSpamStyle)
  document.body.appendChild(actionPanel)
  // 审查流程
  const vet = () => {
    isVetting = true
    let isChanged = false
    getTitleList().forEach((el) => {
      el.classList.add(checkedSign)
      const checkRes = checkTitle(el.textContent || '')
      if (checkRes) {
        if (classes[checkRes]) el.classList.add(classes[checkRes])
        list.push({ el, checkRes })
        isChanged = true
      }
    })
    getContentList().forEach((el) => {
      el.classList.add(checkedSign)
      const checkRes = checkContent(el.textContent || '')
      if (checkRes) {
        if (classes[checkRes]) el.classList.add(classes[checkRes])
        list.push({ el, checkRes })
        isChanged = true
      }
    })
    if (isChanged) renderBtn()
    isVetting = false
  }
  // 渲染提示按钮
  const renderBtn = () => {
    actionPanel.textContent = ''
    list
      .map((item) => {
        const { el, checkRes } = item
        if (el && checkRes) {
          const btn = h(
            'div',
            {
              className: `salt-anti-spam-action-btn ${
                btnClasses[checkRes] || ''
              }`,
              textContent: texts[checkRes],
              onclick: () => {
                // 点击滚动到对应元素
                scrollYToEl(el)
              },
            },
            h('div', {
              className: 'salt-anti-spam-action-btn-close',
              textContent: '×',
              onclick: (ev) => {
                // 点击删除这个提示
                ev.stopPropagation()
                btn.remove()
                el.classList.remove(classes[checkRes])
                const index = list.findIndex((item) => el === item.el)
                if (index > -1) list.splice(index, 1)
              },
            })
          )
          return btn
        }
      })
      .forEach((el) => {
        if (el) actionPanel.appendChild(el)
      })
  }
  // 因为页面上可能会有新的文本，因此直接写个轮询简单暴力
  docReady(() =>
    setInterval(() => {
      if (canVet && !isVetting) vet()
    }, 1500)
  )
  // 配置项
  const setAntiSpam = (enable: boolean) => {
    canVet = enable
    if (enable) {
      antiSpamStyle.textContent = onStyle
    } else {
      antiSpamStyle.textContent = offStyle
    }
  }
  setSetting({
    type: 'switch',
    title: '检查垃圾内容',
    key: 'anti-spam-basic',
    callback: setAntiSpam,
    defaultValue: true,
  })
}
