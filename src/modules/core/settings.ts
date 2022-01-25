/*
 * @Author: Salt
 * @Date: 2022-01-25 22:08:07
 * @LastEditors: Salt
 * @LastEditTime: 2022-01-25 23:32:50
 * @Description: 提供配置面板功能
 * @FilePath: \better-tieba\src\modules\core\settings.ts
 */
import { readAndListen } from '../../utils/storage'

const settingMap: {
  [key: string]: { off: () => unknown }
} = {}
const prefix = 'salt-better-tieba-settings'
// TODO
export function settings() {}

/** 更新配置项时消除原有配置项的事件绑定等 */
function settingUpdate(key: string) {
  const oldSetting = settingMap[key]
  if (!oldSetting) return
  oldSetting.off()
  delete settingMap[key]
}
/** 登记新配置项 */
function settingLog(key: string, newSetting: { off: () => unknown }) {
  settingMap[key] = newSetting
}

/** 开关类型的配置项 */
function setSwitchSetting(option: switchSettingOption) {
  let { defaultValue, initCallback, callback, key } = option
  if (typeof defaultValue !== 'boolean') defaultValue = false
  if (typeof initCallback !== 'function') initCallback = (v) => callback(v, v)
  const storageKey = `${prefix}-${key}`
  const [initValue, off] = readAndListen({
    key: storageKey,
    defaultValue,
    listener(ev) {
      let { newValue, oldValue } = ev
      if (oldValue === null) oldValue = defaultValue!
      if (newValue === null) newValue = defaultValue!
      callback(newValue, oldValue)
    },
    callOnChange: true,
  })
  settingLog(key, { off })
  initCallback(initValue)
}
// TODO
function setTSwitchSetting(option: TswitchSettingOption) {
  let { defaultValue, initCallback, callback, key } = option
  if (typeof defaultValue !== 'number') defaultValue = -1
  if (typeof initCallback !== 'function') initCallback = (v) => callback(v, v)
  const storageKey = `${prefix}-${key}`
}
// TODO
function setStringSetting(option: inputSettingOption | textAreaSettingOption) {
  let { defaultValue, initCallback, callback, key } = option
  if (typeof defaultValue !== 'string') defaultValue = ''
  if (typeof initCallback !== 'function') initCallback = (v) => callback(v, v)
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
  if (typeof initCallback !== 'function') initCallback = (v) => callback(v, v)
  const storageKey = `${prefix}-${key}`
}

export function setSetting(option: SettingOption) {
  const { type, key } = option
  if (!key || typeof key !== 'string')
    throw new Error('创建或修改配置项时必须传入正确的key！')
  settingUpdate(key)
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
  }
}
