import request from '@/utils/request'
/**
 * 查询全部一级菜单
 */
export function parents() {
  return request({
    url: '/basic/router/parents',
    method: 'get'
  })
}
/**
 *分页查询二级菜单
 * @param {*} params
 */
export function children(params) {
  return request({
    url: '/basic/router/children',
    method: 'get',
    params
  })
}
/**
 *更新路由信息
 * @param {*} params
 */
export function update(data) {
  return request({
    url: '/basic/router/' + data.routerId,
    method: 'put',
    data
  })
}
