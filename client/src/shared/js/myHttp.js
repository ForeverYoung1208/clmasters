import { LS } from "./ls"
import jwt_decode from "jwt-decode"

export const myHttp = async (
  relativePath,
  method = 'GET',
  body = {},
  headers = {},
  params = {}
) => {
  const baseUrl = process.env.NODE_ENV === 'production'
    ? new URL(process.env.REACT_APP_PRODUCTION_URL)
    : new URL(process.env.REACT_APP_DEVELOPMENT_URL)
  let url = new URL(relativePath, baseUrl)
 
  //at first, refresh access token if it is, and expires less than in 10sec
  const user = LS('user')

  if (user?.accessToken) {
    const { exp } = jwt_decode(user.accessToken)
    const nowSeconds = (new Date()).valueOf() / 1000
    if ((exp - nowSeconds) < 10) {
      const fetchNewToken = await fetch( 
        new URL('/api/auth/refreshTokens', baseUrl), 
        {
          method: 'POST',
          body: JSON.stringify({ refreshToken: user.refreshToken }),
          headers: { 'Content-Type': 'application/json' }
        }
      )
      var { newAccessToken, newRefreshToken } = await fetchNewToken.json()
      newAccessToken && newRefreshToken
        ? LS.setItem('user', {
          ...user,
          refreshToken: newRefreshToken,
          accessToken: newAccessToken
        })
        : LS.setItem('user', null)
    }
  }

  // do the given request
  headers = {
    ...headers,
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + (newAccessToken || user?.accessToken),
  }

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  
  const fetchPromise = fetch( 
    url, 
    method === 'GET' 
      ? { method, headers}  // Request with GET/HEAD method cannot have body. 
      : { method, body:JSON.stringify(body), headers}
  )
  
  return fetchPromise
}