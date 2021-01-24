import { myHttp } from "../myHttp"

export const apiGetMasters = async () => {
  const masters = await myHttp('/api/masters', 'GET').then(m => m.json())
  return masters
}

export const apiPutMaster = async (master) => {
  const res = await myHttp(`/api/masters/${master.id}`, 'PUT', master)
  return res
}

export const apiPostMaster = async (master) => {
  const res = await myHttp(`/api/masters/`, 'POST', master)
  return res
}

export const apiDeleteMaster = async (masterId) => {
  const res = await myHttp(`/api/masters/${masterId}`, 'DELETE')
  return res
}