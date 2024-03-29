import { readCookie } from 'lib/read-cookie'
import { generateHeader } from 'lib/use-header'
import toast from 'react-hot-toast'

export const request = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
  contentType: 'FORM' | 'JSON',
  body?: Record<string | number, any> | BodyInit | null,
  serverSideToken?: boolean,
  notification?: boolean,
  description?: boolean
) => {
  const token: any = serverSideToken && readCookie('token')

  const requestObject = {
    method,
    headers: generateHeader(token.toString(), contentType),
    body: body ? JSON.stringify(body) : null,
  }

  const response = await fetch(`${process.env.SERVER_URL}${url}`, requestObject)

  if (response.ok) {
    const success = (await response.json()) as T
    if (notification) {
      // @ts-ignore
      toast.success(success.message)
    }
    return success
  } else {
    const error = (await response.json()) as T
    if (notification) {
      if (description) {
        // @ts-ignore
        toast.error(error.description.message)
      } else {
        // @ts-ignore
        toast.error(error.message)
      }
    }
    return Promise.reject({
      ...error,
    }) as unknown as T
  }
}
