import { request } from 'api'

export const EditRequest = ({ data, category }: any) =>
  request(
    `/api/edit/personal/todo/${category}`,
    'POST',
    'JSON',
    data,
    true,
    true,
    false
  )
