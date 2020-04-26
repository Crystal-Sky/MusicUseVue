import ajax from './ajax'

export const emailLogin = (account, password) => ajax('/login', {email: account, password: password}, 'POST')
export const cellphoneLogin = (cellphone, password) => ajax('/login/cellphone', {phone: cellphone, password: password}, 'POST')
export const getBanners = () => ajax('/banner', {type: 2})
export const getPersonalized = () => ajax('/personalized', {limit: 90})
export const getInfo = (id) => ajax('/user/detail', {uid: id})
export const getState = () => ajax('/login/status')
export const logout = () => ajax('/logout')
export const getPlaylistDetail = (id) => ajax('/playlist/detail?id=' + id)
export const getMusicUrl = (id) => ajax('/song/url?id=' + id)
export const getSongDetail = (id) => ajax('/song/detail?ids=' + id)
export const checkMusicCanplay = (id) => ajax('/check/music?id=' + id)

export const setCookie = (key, value, expiresDay) => {
  let date = new Date()
  date.setDate(date.getDate() + expiresDay)
  window.document.cookie = key + '=' + value + '; expires=' + date.toGMTString() // + '; path=/'
  console.log(window.document.cookie)
}
export const deleteCookie = (key) => {
  setCookie(key, '', -1)
}
export const getCookie = (key) => {
  let cookie = window.document.cookie
  let start, end
  if (cookie.length > 0) {
    start = cookie.indexOf(key + '=')
    if (start !== -1) {
      start = start + key.length + 1
      end = cookie.indexOf(';', start)
      if (end === -1) {
        end = cookie.length
      }
      return cookie.substring(start, end)
    }
  }
  return ''
}
export const checkCookie = (key) => {
  let value = getCookie(key)
  if (value !== null && value !== '') {
    return true
  } else {
    return false
  }
}
export const getFullCookie = (key) => {
  return window.document.cookie
}
