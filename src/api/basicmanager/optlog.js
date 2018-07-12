import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/basic/log/page',
    method: 'get',
    params
  })
}
