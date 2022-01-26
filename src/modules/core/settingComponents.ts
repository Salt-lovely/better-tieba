/*
 * @Author: Salt
 * @Date: 2022-01-26 22:31:53
 * @LastEditors: Salt
 * @LastEditTime: 2022-01-26 23:51:17
 * @Description: 提供配置面板的预制组件
 * @FilePath: \better-tieba\src\modules\core\settingComponents.ts
 */

import h from '../../utils/h'
import { read, write } from '../../utils/storage'

const style = h('style', null, `
/**/
.switch-setting {
  padding: 8px 16px 0;
}
.switch-setting, .switch-setting * {
  box-sizing: border-box;
}
.switch-setting.half-title {
  display: flex;
}
.setting-title, .setting-body {
  width: 100%;
  font-size: 16px;
  line-height: 1.5; /* WCAG 推荐的行高 */
}
.setting-title {
  padding-right: 4px;
  text-align: right;
}
.setting-title::after {
  content: ":";
}
/* 开关 */
.setting-salt-switch {
  display: inline-block;
  position: relative;
  width: 48px;
  height: 24px;
  border-radius: 12px;
  box-shadow: inset 0 0 4px #2226;
  transition: 240ms ease;
}
.setting-salt-switch::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  top: 2px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: inset -2px -2px 4px #2222, inset 2px 2px 4px #fff2;
  transition: 240ms ease;
}
.setting-salt-switch:active::after {
  width: 24px;
}
.setting-salt-switch.on {
  background-color: var(--primary-color, #ff80df);
}
.setting-salt-switch.on::after {
  left: 26px;
}
.setting-salt-switch.on:active::after {
  left: 22px;
}
.setting-salt-switch.off {
  background-color: #999;
}
.setting-salt-switch.off::after {
  left: 2px;
}
`)
document.head.appendChild(style);

export function switchSetting(props: {
  title: string
  tooltip?: string
  initValue: boolean
  storageKey: string
  callback: (newValue: boolean, oldValue: boolean) => unknown
}) {
  const { title, tooltip, initValue, storageKey, callback } = props
  return h(
    'div',
    { className: 'switch-setting half-title' },
    // 标题和说明
    h(
      'div',
      { className: 'setting-title' },
      h('span', null, title),
      tooltip && h('div', { className: 'setting-tooltip' }, tooltip)
    ),
    h(
      'div',
      { className: 'setting-body' },
      h('div', {
        className: `setting-salt-switch ${initValue ? 'on' : 'off'}`,
        onclick(ev) {
          const _this = ev.target as HTMLDivElement
          const oldValue = read(storageKey, initValue)
          const newValue = !oldValue
          _this.className = `setting-salt-switch ${newValue ? 'on' : 'off'}`
          write(storageKey, newValue)
          callback(newValue, oldValue)
        },
      })
    )
  )
}
