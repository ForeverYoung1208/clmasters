import { useState, useCallback } from 'react'
// import { useState } from 'react'

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)


  const request = useCallback ( async (url, method='GET', body=null, headers={} ) =>{
    try {
      setIsLoading(true)

      body && JSON.stringify(body)
      headers = {
        ...headers,
        'Content-Type': 'application/json',
      }


      const res = await fetch( 'http://localhost:5000'+url, { method, body, headers})
      const data = await res.json();
      setIsLoading(false)

      if(!res.ok){
        throw new Error(`Smthng wrong with http request ${method}, ${url}, ${JSON.stringify(headers)}, ${JSON.stringify(body)}; got message: ${data?.message}`)
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

