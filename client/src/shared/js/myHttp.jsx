import { LS } from "./ls"

export const myHttp = async (
  relativePath,
  method = 'GET',
  body = {},
  headers = {},
  params = {}
) => {

  const accessToken = LS('user')?.accessToken
    
  headers = {
    ...headers,
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + accessToken,
}
  
  const baseUrl = process.env.NODE_ENV === 'production'
    ? new URL(process.env.REACT_APP_PRODUCTION_URL)
    : new URL(process.env.REACT_APP_DEVELOPMENT_URL)
  
  let url = new URL(relativePath, baseUrl)

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  
  const _fetch = fetch( 
    url, 
    method === 'GET' 
      ? { method, headers}  // Request with GET/HEAD method cannot have body. 
      : { method, body:JSON.stringify(body), headers}
  )
  
  
  
  return _fetch
}