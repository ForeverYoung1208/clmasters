import { myHttp } from "../myHttp"
import { apiAuthUserByToken } from "./auth"

export const apiGetAdmindata = async () => {
  await apiAuthUserByToken() // to prevent token being suddenly outdated
  let [orders, masters, users, clocks] = await Promise.all([
    myHttp('/api/orders', 'GET').then(x => x.json()),
    myHttp('/api/masters', 'GET').then(x => x.json()),
    myHttp('/api/users', 'GET').then(x => x.json()),
    myHttp('/api/clocks', 'GET').then(x => x.json()),
  ])
  orders = orders.map(order => ({ ...order, onTime: new Date(order.onTime) }))
  return { admindata: { orders, masters, users, clocks } }
}