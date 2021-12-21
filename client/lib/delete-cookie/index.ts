import { readCookie } from 'lib/read-cookie'

export function deleteCookie<T = any>(name: T, path: T, domain: T) {
  if (readCookie(name)) {
    document.cookie =
      name +
      '=' +
      (path ? ';path=' + path : '') +
      (domain ? ';domain=' + domain : '') +
      ';expires=Thu, 01 Jan 1970 00:00:01 GMT'
  }
}
