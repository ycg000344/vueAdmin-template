import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/auth/user/token',
    method: 'post',
    data: {
      loginname: username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/basic/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/auth/user/logout',
    method: 'post'
  })
}
