import { myHttp } from '../myHttp'

export const apiPostPreorder = async (preorderData) => {
  const res = await myHttp('/api/preorder', 'POST', preorderData)
  return res
}
