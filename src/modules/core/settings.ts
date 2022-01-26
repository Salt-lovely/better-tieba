/*
 * @Author: Salt
 * @Date: 2022-01-25 22:08:07
 * @LastEditors: Salt
 * @LastEditTime: 2022-01-26 23:36:31
 * @Description: 提供配置面板功能
 * @FilePath: \better-tieba\src\modules\core\settings.ts
 */
import h from '../../utils/h'
import { readAndListen } from '../../utils/storage'
import { switchSetting } from './settingComponents'

// DOM
const header = h('div', { className: 'salt-better-tieba-setting-panel-header' })
const body = h('div', { className: 'salt-better-tieba-setting-panel-body' })
const container = h(
  'div',
  { id: 'salt-better-tieba-setting-panel' },
  header,
  body
)
// 闭包储存的信息
type settingInfo = { off: () => unknown; component: HTMLElement }
const settingMap: {
  [key: string]: settingInfo
} = {}
const prefix = 'salt-better-tieba-settings'
// TODO
export function settings() {
  document.body.appendChild(container)
}

/** 更新配置项时消除原有配置项的事件、组件绑定等 */
function settingClearEffect(key: string) {
  const oldSetting = settingMap[key]
  if (!oldSetting) return
  oldSetting.off()
  oldSetting.component.remove()
  delete settingMap[key]
}
/** 登记新配置项 */
function settingLog(key: string, newSetting: settingInfo) {
  const { component } = newSetting
  body.appendChild(component)
  settingMap[key] = newSetting
}
/** 更新配置项的组件 */
function componentUpdate(key: string, newComponent: HTMLElement) {
  const setting = settingMap[key]
  if (!setting) return
  const { component } = setting
  component.parentElement?.replaceChild(newComponent, component)
  setting.component = newComponent
}

/** 开关类型的配置项 */
function setSwitchSetting(option: switchSettingOption) {
  let { defaultValue, initCallback, callback, key, title, tooltip } = option
  if (typeof defaultValue !== 'boolean') defaultValue = false
  const storageKey = `${prefix}-${key}`
  const [initValue, off] = readAndListen({
    key: storageKey,
    defaultValue,
    listener(ev) {
      let { newValue, oldValue } = ev
      if (oldValue === null) oldValue = defaultValue!
      if (newValue === null) newValue = defaultValue!
      // 更新组件
      componentUpdate(
        key,
        h(switchSetting, { ...componentProps, initValue: newValue })
      )
      callback(newValue, oldValue)
    },
    callOnChange: true,
  })
  const componentProps = { title, tooltip, initValue, storageKey, callback }
  settingLog(key, { off, component: h(switchSetting, componentProps) })
  initCallback!(initValue)
}
// TODO
function setTSwitchSetting(option: TswitchSettingOption) {
  let { defaultValue, initCallback, callback, key } = option
  if (typeof defaultValue !== 'number') defaultValue = -1
  const storageKey = `${prefix}-${key}`
}
// TODO
function setStringSetting(option: inputSettingOption | textAreaSettingOption) {
  let { defaultValue, initCallback, callback, key } = option
  if (typeof defaultValue !== 'string') defaultValue = ''
  const storageKey = `${prefix}-${key}`
}
// TODO
function setNumberSetting(option: numberSettingOption) {
  let { defaultValue, initCallback, callback, key, max, min } = option
  if (typeof defaultValue !== 'number') defaultValue = 0
  if (typeof max !== 'number') max = Infinity
  if (typeof min !== 'number') min = -Infinity
  if (max < min) {
    const temp = max
    max = min
    min = temp
  }
  const storageKey = `${prefix}-${key}`
}
/** 新建配置，配置会自动跨页同步 */
export function setSetting(option: SettingOption) {
  const { type, key } = option
  // 检查key
  if (!key || typeof key !== 'string')
    throw new Error('创建或修改配置项时必须传入正确的key！')
  // 补全initCallback方法
  let { initCallback, callback } = option
  if (typeof initCallback !== 'function')
    // @ts-ignore
    option.initCallback = (v: unknown) => callback(v, v)
  // 如果是修改配置，则需要消除之前生成配置的影响
  settingClearEffect(key)
  switch (type) {
    case 'input':
    case 'textArea':
      setStringSetting(option)
      break
    case 'switch':
      setSwitchSetting(option)
      break
    case 'Tswitch':
      setTSwitchSetting(option)
      break
    case 'number':
      setNumberSetting(option)
      break
    default:
      throw new Error(`无法识别的配置类型：${type}`)
  }
}
