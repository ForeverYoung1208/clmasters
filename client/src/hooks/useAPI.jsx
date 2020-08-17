import { useHttp } from "./useHttp"

export const useAPI = ({env})=>{
  const { isLoading, request } = useHttp({env})

  const loginUser = async (credentials)=>{
    const { user } = await request('/api/auth/login', 'POST', {...credentials} )
    return user
  }

  const registerUser = async ({email, name})=>{
    const { user } = await request('/api/auth/register', 'POST', {email, name} )
    return user
  };

  const postPreorder = async(preorderData)=>{
    const result = await request('/api/preorderData', 'POST', {preorderData} )
    return result
  }

  const getVoc = async()=>{
    const { message, data } = await request('/api/cities', 'GET')
    return {message, voc:{cities:data}}
  }

  
  return {API:{loginUser, registerUser, getVoc}, isLoading}
}