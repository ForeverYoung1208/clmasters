import { myHttp } from "../myHttp"

export const apiPaymentCreateSession = async () => {
  const session = await myHttp('/api/payment/createSession', 'POST').then(m => m.json())
  return session
}