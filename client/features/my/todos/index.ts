import { request } from 'api'

export const MyTodosRequest = async () =>
  request(`/api/get/personal/todo`, 'GET', 'JSON', null, true, false)
