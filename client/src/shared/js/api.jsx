import { myHttp } from "./myHttp"

export const apiLoginUser = async (credentials) => {
  try {
    const res = await myHttp('/api/auth/login', 'POST', { ...credentials }).then(u => u.json())
    return res
  } catch (error) {
    return error
  }
}

export const apiRefreshAccessToken = async (user) => {
  const res = await myHttp('/api/auth/token', 'POST',
    {refreshToken:user?.refreshToken}
  )
  const { newAccessToken } = await res.json()
  return newAccessToken
}

export const apiRegisterUser = async ({email, name})=>{
  const { user } = await myHttp('/api/auth/register', 'POST', {email, name} ).then(u=>u.json())
  return user
};

export const apiGetVoc = async () => {
  const [citiesRes, clocksRes] = await Promise.all([
    myHttp('/api/cities', 'GET'),
    myHttp('/api/clocks', 'GET')
  ])
  const [cities, clocks] = await Promise.all([
    citiesRes.json(),
    clocksRes.json(),
  ])
  return { voc:{cities, clocks }}
}

export const apiGetAdmindata = async() => {
  const [ordersRes, mastersRes, usersRes, citiesRes] = await Promise.all([
    myHttp('/api/orders', 'GET'),
    myHttp('/api/masters', 'GET'),
    myHttp('/api/users', 'GET'),
    myHttp('/api/cities', 'GET'),
  ])
  let [orders, masters, users, cities] = await Promise.all([
    ordersRes.json(),
    mastersRes.json(),
    usersRes.json(),
    citiesRes.json(),
  ])

  orders = orders.map(order => ({ ...order, onTime: new Date(order.onTime) }))
  
  return { admindata: { orders, masters, users, cities } }

}

export const apiPostPreorder = async(preorderData)=>{
  const preorderRes_ = await myHttp('/api/preorder', 'POST', { preorderData })
  const preorderResult = await preorderRes_.json()
  return {preorderResult}
}


