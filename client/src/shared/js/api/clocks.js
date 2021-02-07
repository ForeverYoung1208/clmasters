import { myHttp } from "../myHttp"

export const apiGetClocks = async () => {
  const masters = await myHttp('/api/clocks', 'GET').then(m => m.json())
  return masters
}
