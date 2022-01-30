/*
 * @Author: Salt
 * @Date: 2022-01-30 12:14:18
 * @LastEditors: Salt
 * @LastEditTime: 2022-01-30 12:53:46
 * @Description: 这个文件的功能
 * @FilePath: \better-tieba\src\modules\moderator\delButton.ts
 */
import h from '../../utils/h'
import { setSetting } from '../core/settings'

export default () => {
  const addDelButton = () =>
    document.body.$$('.d_del_thread').forEach((el) => {
      if (el.$('.j_thread_shield') && !el.$('.j_thread_delete')) {
        el.appendChild(
          h(
            'a',
            {
              rel: 'noopener',
              className: 'j_thread_delete salt-add',
              style: { marginLeft: '8px' },
              href: '#',
            },
            '删除主题'
          )
        )
      }
    })
  const removeDelButton = () =>
    document.body.$$('.j_thread_delete.salt-add').forEach((el) => {
      el.parentElement?.removeChild(el)
    })
  setSetting({
    type: 'switch',
    defaultValue: true,
    key: 'show-delete-button',
    title: '显示删除帖子按钮',
    callback: (v) => (v ? addDelButton() : removeDelButton()),
  })
}
