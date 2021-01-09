import { myHttp } from "../myHttp"

export const apiGetCities = async () => {
  const cities = await myHttp('/api/cities', 'GET').then(c => c.json())
  return { cities }
}