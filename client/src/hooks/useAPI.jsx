import { useHttp } from "./useHttp"

export const useAPI = ({env}) => {
  const { isLoading, request } = useHttp({env})

  const loginUser = async (credentials) =>{
    const { user } = await request('/api/auth/login', 'POST', {...credentials} )
    return user
  }

  const registerUser = async ({email, name}) => {
    const { user } = await request('/api/auth/register', 'POST', {email, name} )
      
    return user
  };

  
  return {API:{loginUser, registerUser}, isLoading}
}