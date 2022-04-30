/*
 * @Author: Salt
 * @Date: 2022-04-30 14:35:31
 * @LastEditors: Salt
 * @LastEditTime: 2022-04-30 19:54:26
 * @Description: 检查垃圾内容用到的样式表
 * @FilePath: \better-tieba\src\modules\antiSpam\css.ts
 */
import { ADVERTIS, SALACITY, SWEARING, classes, btnClasses, colors } from './constant'
const {
  [ADVERTIS]: adClass,
  [SALACITY]: sqClass,
  [SWEARING]: ckClass,
} = classes
const {
  [ADVERTIS]: adBtnClass,
  [SALACITY]: sqBtnClass,
  [SWEARING]: ckBtnClass,
} = btnClasses
const {
  [ADVERTIS]: adColor,
  [SALACITY]: sqColor,
  [SWEARING]: ckColor,
} = colors

export const onStyle = `/* 检查垃圾内容用到的样式表 - 启用状态 */
.${adClass}, .${sqClass}, .${ckClass} {
  outline: 4px solid #000;
}
.${adClass} {
  outline-color: ${adColor};
}
.${sqClass} {
  outline-color: ${sqColor};
}
.${ckClass} {
  outline-color: ${ckColor};
}
/* 按钮组 */
#salt-anti-spam-action-panel {
  box-sizing: border-box;
  display: inline-block;
  position: fixed;
  right: 0;
  bottom: calc(10vh + 5px);
  max-height: calc(50vh - 5px);
  overflow-y: auto;
  overflow-x: hidden;
}
#salt-anti-spam-action-panel *{
  box-sizing: border-box;
  transition: all 240ms ease;
}
/* 按钮 */
.salt-anti-spam-action-btn {
  position: relative;
  min-width: 84px;
  height: 32px;
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 24px;
  text-align: center;
  color: #fff;
  user-select: none;
  cursor: pointer;
}
.salt-anti-spam-action-btn:hover {
  padding: 4px 16px 4px 0;
  border-radius: 4px;
  color: #fff;
}
.salt-anti-spam-action-btn + .salt-anti-spam-action-btn {
  margin-top: 4px;
}
.salt-anti-spam-action-btn-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 32px;
  font-size: 16px;
  text-align: center;
  color: #fff;
  line-height: 32px;
  opacity: 0;
  user-select: none;
  cursor: pointer;
}
.salt-anti-spam-action-btn-close:hover {
  background-color: #fff9;
}
.salt-anti-spam-action-btn:hover .salt-anti-spam-action-btn-close {
  opacity: 1;
}
.${adBtnClass} {
  background-color: ${adColor};
}
.${sqBtnClass} {
  background-color: ${sqColor};
}
.${ckBtnClass} {
  background-color: ${ckColor};
}
`
export const offStyle = `/* 检查垃圾内容用到的样式表 - 禁用状态 */
#salt-anti-spam-action-panel {
  display: none;
}
`
