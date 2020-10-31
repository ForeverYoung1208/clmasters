import { myHttp } from "../myHttp"

export const apiPutEntity = async ({ sectionKey, data }) => {
  const res = await myHttp(`/api/${sectionKey}/${data.id}`, 'PUT', data)
  return res
}

export const apiPostEntity = async ({ sectionKey, data }) => {
  const res = await myHttp(`/api/${sectionKey}/`, 'POST', data)
  return res
}

export const apiDeleteEntity = async ({ sectionKey, id }) => {
  const res = await myHttp(`/api/${sectionKey}/${id}`, 'DELETE')
  return res
}

export const apiGetEntityBy = async ({ sectionKey, params }) => { 
  const res = await myHttp(`/api/${sectionKey}/query`, 'GET', {}, {}, params)
  return res
}
