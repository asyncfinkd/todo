import { deleteCookie } from 'lib/delete-cookie'
import { readCookie } from 'lib/read-cookie'
import { request } from 'api'
import { useContext, useEffect, useState } from 'react'
import { ApplicationContext } from 'context/application'
import decode from 'jwt-decode'
import constate from 'constate'

const refreshTokenRequest = async () => {
  return request(`/api/auth/refresh`, 'POST', 'JSON', null, true)
}

const useAuth = () => {
  const { setAccess_Token, access_token } = useContext(ApplicationContext)

  const removeToken = () => {
    deleteCookie('token', '/', '')
  }

  const refreshToken = () => {
    if (readCookie('token')) {
      refreshTokenRequest()
        .then((result: any) => {
          document.cookie = `token=${result.access_token};path=/`

          let decodedData = decode(result.access_token)

          setAccess_Token(decodedData)
        })
        .catch((err) => {
          if (err.statusCode === 401) {
            removeToken()

            window.location.href = '/'
          }
        })
    }
  }

  useEffect(() => {
    refreshToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const watchToken = (event: StorageEvent) => {
    if (event.key === 'token') {
      removeToken()
    }
  }

  useEffect(() => {
    window.addEventListener('storage', watchToken)

    return () => {
      window.removeEventListener('storage', watchToken)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { access_token } as const
}

export const [AuthProvider, useAuthProvider] = constate(useAuth)
