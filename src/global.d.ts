/*
 * @Author: Salt
 * @Date: 2022-01-22 00:48:26
 * @LastEditors: Salt
 * @LastEditTime: 2022-01-26 22:54:52
 * @Description: 全局类型声明
 * @FilePath: \better-tieba\src\global.d.ts
 */
type solvableChild = string | boolean | number | Node | undefined | null
type solvableChildren = solvableChild[]
type acceptableChildren =
  | solvableChild
  | solvableChildren
  | (solvableChild | solvableChildren)[]

interface componentFunction<Props extends object | null> {
  (): HTMLElement
  (props: Props): HTMLElement
  (props: Props, ...children: Node[]): HTMLElement
  (props: null, ...children: Node[]): HTMLElement
}

interface hyperFunction {
  // tag => HTMLElement
  <Tag extends keyof HTMLElementTagNameMap>(
    tag: Tag,
    props?: Partial<HTMLElementTagNameMap[Tag]> | null
  ): HTMLElementTagNameMap[Tag]
  <Tag extends keyof HTMLElementTagNameMap>(
    tag: Tag,
    props: Partial<HTMLElementTagNameMap[Tag]> | null,
    ...children: acceptableChildren[]
  ): HTMLElementTagNameMap[Tag]
  // fn => HTMLElement 无参数
  (fn: () => HTMLElement): HTMLElement
  (
    fn: (props: null, ...children: Node[]) => HTMLElement,
    props: null,
    ...children: acceptableChildren[]
  ): HTMLElement
  // fn => HTMLElement 有参数
  <Props extends object>(
    fn: (props: Props) => HTMLElement,
    props: Props
  ): HTMLElement
  <Props extends object>(
    fn: (props: Props, ...children: Node[]) => HTMLElement,
    props: Props,
    ...children: acceptableChildren[]
  ): HTMLElement
}

type SettingOption =
  | switchSettingOption
  | TswitchSettingOption
  | inputSettingOption
  | textAreaSettingOption
  | numberSettingOption

interface basicSettingOption<T> {
  /** 对应的localStorage储存键，会自动添加前缀防止撞车，同时也是区分不同配置项用的 */
  key: string
  /** 配置项标题 */
  title: string
  /** 配置项新建、修改时调用的函数，没有的话用回调函数代替 */
  initCallback?: (value: T) => unknown
  /** 回调函数 */
  callback: (newValue: T, oldValue: T) => unknown
  /** 配置项说明 */
  tooltip?: string
  /** 默认值 */
  defaultValue?: T
}
interface switchSettingOption extends basicSettingOption<boolean> {
  /** 开关类型的配置项 */
  type: 'switch'
  /** 默认为 false */
  defaultValue?: boolean
}
interface TswitchSettingOption extends basicSettingOption<0 | 1 | -1> {
  /** `开、关、默认`三型的配置项 */
  type: 'Tswitch'
  /** 默认为 -1 */
  defaultValue?: 0 | 1 | -1
}
interface inputSettingOption extends basicSettingOption<string> {
  /** 单行输入框类型的配置项 */
  type: 'input'
  /** 默认为空 */
  defaultValue?: string
}
interface textAreaSettingOption extends basicSettingOption<string> {
  /** 多行输入框类型的配置项 */
  type: 'textArea'
  /** 默认为空 */
  defaultValue?: string
}
interface numberSettingOption extends basicSettingOption<number> {
  /** 数字类型的配置项 */
  type: 'number'
  /** 默认为正无穷 */
  max?: number
  /** 默认为负无穷 */
  min?: number
  /** 默认为 0 */
  defaultValue?: number
}
