import Cookies from 'js-cookie'

const TokenKey = 'X-USER-AUTHORIZATION'

export function getTokenKey() {
  return TokenKey
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
