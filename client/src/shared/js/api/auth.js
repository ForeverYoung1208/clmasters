import { myHttp } from "../myHttp"


export const apiLoginUser = async (credentials) => {
  try {
    const res = await myHttp('/api/auth/login', 'POST', { ...credentials })
    const { user, message } = await res.json()
    if (!res.ok) return message
    return user

  } catch (error) {
    return error
  }
}

export const apiAuthUserByToken = async () => {
  try {
    const { user } = await myHttp('/api/auth/byToken', 'GET').then(u => u.json())
    return user
  } catch (error) {
    return error
  }
}

export const apiAutoLoginUser = async (oldUser) => {
  try {
    const user = await apiAuthUserByToken()
    if (user && !user.error) { 
      user.accessToken = oldUser.accessToken   // keep existing tokens
      user.refreshToken = oldUser.refreshToken
      return user
    } else {
      return {error: user?.error}
    }
  } catch (error) {
    return error
  }
}

export const apiRefreshTokens = async (user) => {
  const res = await myHttp('/api/auth/refreshTokens', 'POST',
    {refreshToken:user?.refreshToken}
  )
  const { newAccessToken, newRefreshToken } = await res.json()
  return { newAccessToken, newRefreshToken }
}



