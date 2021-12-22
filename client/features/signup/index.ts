import { request } from 'api'
import { TSignUpProps } from 'schema/pages/signup'

export const SignUpRequest = async ({ data }: { data: TSignUpProps }) =>
  request('/api/register', 'POST', 'JSON', data, false, true, true)
