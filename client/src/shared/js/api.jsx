import { myHttp } from "./myHttp"


export const apiLoginUser = async (credentials) => {
  try {
    const { user } = await myHttp('/api/auth/login', 'POST', { ...credentials }).then(u => u.json())
    return user
  } catch (error) {
    return { error }
  }
}

export const apiAuthUserByToken = async () => {
  try {
    const { user } = await myHttp('/api/auth/byToken', 'GET').then(u => u.json())
    return user
  } catch (error) {
    return { error }
  }
}

export const apiAutoLoginUser = async (oldUser) => {
  const user = await apiAuthUserByToken()
  if (user && !user.error) { 
    user.accessToken = oldUser.accessToken   // keep existing tokens
    user.refreshToken = oldUser.refreshToken
    return user
  } else {
    return null
  }
}

export const apiRefreshTokens = async (user) => {
  const res = await myHttp('/api/auth/refreshTokens', 'POST',
    {refreshToken:user?.refreshToken}
  )
  const { newAccessToken, newRefreshToken } = await res.json()
  return { newAccessToken, newRefreshToken }
}

export const apiGetVoc = async () => {
  const [cities, clocks, masters] = await Promise.all([
    myHttp('/api/cities', 'GET').then(x => x.json()),
    myHttp('/api/clocks', 'GET').then(x => x.json()),
    myHttp('/api/masters', 'GET').then(x => x.json())
  ])
  return { voc:{cities, clocks, masters }}
}

export const apiGetAdmindata = async () => {
  await apiAuthUserByToken() // to prevent unexpected token being outdated
  let [orders, masters, users, cities, clocks] = await Promise.all([
    myHttp('/api/orders', 'GET').then(x => x.json()),
    myHttp('/api/masters', 'GET').then(x => x.json()),
    myHttp('/api/users', 'GET').then(x => x.json()),
    myHttp('/api/cities', 'GET').then(x => x.json()),
    myHttp('/api/clocks', 'GET').then(x => x.json()),
  ])
  orders = orders.map(order => ({ ...order, onTime: new Date(order.onTime) }))
  return { admindata: { orders, masters, users, cities, clocks } }
}

export const apiPutEntity = async ({ sectionKey, data }) => {
  const res = await myHttp(`/api/${sectionKey}/${data.id}`, 'PUT', data)
  return res
}

export const apiPostEntity = async ({ sectionKey, data }) => {
  const res = await myHttp(`/api/${sectionKey}/`, 'POST', data)
  return res
}

export const apiDeleteEntity = async ({ sectionKey, id }) => {
  const res = await myHttp(`/api/${sectionKey}/${id}`, 'DELETE')
  return res
}


export const apiPostPreorder = async(preorderData)=>{
  const res = await myHttp('/api/preorder', 'POST', { preorderData })
  return res
}

export const apiGetEntityBy = async ({ sectionKey, params }) => { 
  const res = await myHttp(`/api/${sectionKey}/query`, 'GET', {}, {}, params)
  return res

}

