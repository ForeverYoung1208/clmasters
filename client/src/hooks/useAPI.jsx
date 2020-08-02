import { useHttp } from "./useHttp"

export const useAPI = ({env}) => {
  const { isLoading, request } = useHttp({env})

  const loginUser = async (credentials) =>{
    const { user } = await request('/api/auth/login', 'POST', JSON.stringify({...credentials}) )
    return user
  }

  const registerUser = async ({email, name}) => {
    const { user } = await request('/api/auth/register', 'POST', JSON.stringify({email, name}) )
      
    return(user)
  };

  
  return {API:{loginUser, registerUser}, isLoading}
}