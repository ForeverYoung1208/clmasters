import { useState, useCallback } from 'react'

export const useHttp = ({env}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)


  const request = useCallback ( async (relativePath, method='GET', body={}, headers={} ) =>{
    try {
      setIsLoading(true)

      headers = {
        ...headers,
        'Content-Type': 'application/json',
      }

      const baseUrl = env==='production' ? process.env.REACT_APP_PRODUCTION_URL : process.env.REACT_APP_DEVELOPMENT_URL
      console.log('[env]:', env);

      const res = await fetch( baseUrl+relativePath, { method, body:JSON.stringify(body), headers})
      const data = await res.json();
      setIsLoading(false)

      if(!res.ok){
        throw new Error(data?.message)
      }

      return data
    } catch (e) {
      setIsLoading(false)
      setError(e.message)
      throw e
    }
  } , [env])

  const clearError = () => {
    setError(null)      
  };

  return({isLoading, request, error, clearError})  

};

