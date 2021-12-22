import { request } from 'api'

export const EditRequest = ({ data }: any, category: string) =>
  request(
    `/api/edit/personal/todo/${category}`,
    'POST',
    'JSON',
    data,
    true,
    true,
    false
  )
