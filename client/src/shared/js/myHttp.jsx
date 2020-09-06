
export const myHttp = async (relativePath, method = 'GET', body = {}, headers = {}) => {
    
  headers = {
    ...headers,
    'Content-Type': 'application/json',
  }

  const baseUrl = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PRODUCTION_URL
    : process.env.REACT_APP_DEVELOPMENT_URL

  return fetch( 
    baseUrl+relativePath, 
    method === 'GET' 
    ? { method, headers}  // Request with GET/HEAD method cannot have body. 
    : { method, body:JSON.stringify(body), headers}
  )
}

