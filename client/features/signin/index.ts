import { request } from 'api'
import { TSignInProps } from 'schema/pages/signin'

export const SignInRequest = async ({ data }: { data: TSignInProps }) =>
  request('/api/auth', 'POST', 'JSON', data, false, true)
