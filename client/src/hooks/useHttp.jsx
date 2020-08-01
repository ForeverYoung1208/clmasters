import { useState, useCallback } from 'react'
// import { useState } from 'react'

export const useHttp = ({env}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)


  const request = useCallback ( async (relativePath, method='GET', body=null, headers={} ) =>{
    try {
      setIsLoading(true)

      body && JSON.stringify(body)
      headers = {
        ...headers,
        'Content-Type': 'application/json',
      }

      const baseUrl = env==='production' ? process.env.REACT_APP_PRODUCTION_URL : process.env.REACT_APP_DEVELOPMENT_URL
      console.log('[env]:', env);

      const res = await fetch( baseUrl+relativePath, { method, body, headers})
      const data = await res.json();
      setIsLoading(false)

      if(!res.ok){
        throw new Error(`Smthng wrong with http request ${method}, ${baseUrl+relativePath}, ${JSON.stringify(headers)}, ${JSON.stringify(body)}; got message: ${data?.message}`)
      }

      return data
    } catch (e) {
      setIsLoading(false)
      setError(e.message)
      throw e
    }
  } , [])

  const clearError = () => {
    setError(null)      
  };

  return({isLoading, request, error, clearError})  

};

