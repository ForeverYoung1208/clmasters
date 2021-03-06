import { myHttp } from "../myHttp"

export const apiGetCities = async (query) => {
  const queryStr = query ? `?${query}` : ''  
  const cities = await myHttp('/api/cities'+queryStr, 'GET').then(c => c.json())
  return cities
}

export const apiPutCity = async (city) => {
  const res = await myHttp(`/api/cities/${city.id}`, 'PUT', city)
  return res
}

export const apiPostCity = async (city) => {
  const res = await myHttp(`/api/cities/`, 'POST', city)
  return res
}

export const apiDeleteCity = async (cityId) => {
  const res = await myHttp(`/api/cities/${cityId}`, 'DELETE')
  return res
}