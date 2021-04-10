import { myHttp } from "../myHttp"

export const apiGetClocks = async (query) => {
  const queryStr = query ? `?${query}` : ''  
  const clocks = await myHttp('/api/clocks'+queryStr, 'GET').then(c => c.json())
  return clocks
}