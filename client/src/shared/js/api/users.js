import { myHttp } from "../myHttp"

export const apiGetUsers = async () => {
  const users = await myHttp('/api/users', 'GET').then(m => m.json())
  return users
}

export const apiPutUser = async (user) => {
  const res = await myHttp(`/api/users/${user.id}`, 'PUT', user)
  return res
}

export const apiPostUser = async (user) => {
  const res = await myHttp(`/api/users/`, 'POST', user)
  return res
}

export const apiDeleteUser = async (userId) => {
  const res = await myHttp(`/api/users/${userId}`, 'DELETE')
  return res
}