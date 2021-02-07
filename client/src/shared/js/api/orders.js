import { myHttp } from "../myHttp"

export const apiGetOrders = async () => {
  const orders = await myHttp('/api/orders', 'GET').then(m => m.json())
  return orders
}

export const apiPutOrder = async (order) => {
  const res = await myHttp(`/api/orders/${order.id}`, 'PUT', order)
  return res
}

export const apiPostOrder = async (order) => {
  const res = await myHttp(`/api/orders/`, 'POST', order)
  return res
}

export const apiDeleteOrder = async (orderId) => {
  const res = await myHttp(`/api/orders/${orderId}`, 'DELETE')
  return res
}