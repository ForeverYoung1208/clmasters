import { useHttp } from "./useHttp"

export const useAPI = ({env}) => {
  const { isLoading, request } = useHttp({env})

  const loginUser = async (credentials) =>{
    const { user } = await request('/api/auth/login', 'POST', JSON.stringify({...credentials}) )
    return user
  }
  
  //...
  
  return {API:{loginUser}, isLoading}
}