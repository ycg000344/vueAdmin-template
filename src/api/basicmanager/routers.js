import request from '@/utils/request'

/**
 *查询全部一级菜单
 * @param {*} params
 */
export function getParentRouters(params) {
  return request({
    url: '/basic/router/all',
    method: 'get',
    params
  })
}
/**
 *分页查询二级菜单
 * @param {*} params
 */
export function getRouters(params) {
  return request({
    url: '/basic/router/page',
    method: 'get',
    params
  })
}
