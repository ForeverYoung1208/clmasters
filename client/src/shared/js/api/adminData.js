import { myHttp } from "../myHttp"
import { apiAuthUserByToken } from "./auth"

//try to extract get city to its own function
export const apiGetAdmindata = async () => {
  await apiAuthUserByToken() // to prevent token being suddenly outdated
  // let [orders, masters, users, cities, clocks] = await Promise.all([
  let [orders, masters, users, clocks] = await Promise.all([
    myHttp('/api/orders', 'GET').then(x => x.json()),
    myHttp('/api/masters', 'GET').then(x => x.json()),
    myHttp('/api/users', 'GET').then(x => x.json()),
    // myHttp('/api/cities', 'GET').then(x => x.json()),
    myHttp('/api/clocks', 'GET').then(x => x.json()),
  ])
  orders = orders.map(order => ({ ...order, onTime: new Date(order.onTime) }))
  return { admindata: { orders, masters, users, clocks } }
  // return { admindata: { orders, masters, users, cities, clocks } }
}