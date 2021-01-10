import { myHttp } from "../myHttp"

export const apiGetCities = async () => {
  const cities = await myHttp('/api/cities', 'GET').then(c => c.json())
  return { cities }
}

export const apiPutCity = async (city) => {
  const res = await myHttp(`/api/cities/${city.id}`, 'PUT', city)
  return res
}