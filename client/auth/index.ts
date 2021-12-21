import { deleteCookie } from 'lib/delete-cookie'
import { readCookie } from 'lib/read-cookie'
import { request } from 'api'

const refreshTokenRequest = async () => {
  return request(`/api/auth/refresh`, 'POST', 'JSON', null, true)
}

export const refreshToken = () => {
  if (readCookie('token')) {
    refreshTokenRequest()
      .then((result: any) => {
        document.cookie = `token=${result.access_token};path=/`
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          deleteCookie('token', '/', '')

          window.location.href = '/'
        }
      })
  }
}
