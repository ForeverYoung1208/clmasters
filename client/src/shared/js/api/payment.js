import { myHttp } from "../myHttp"

export const apiPaymentCreateSession = async (orderId) => {
  const session = await myHttp(`/api/payment/createSession?orderId=${orderId}`, 'POST').then(m => m.json())
  return session
}