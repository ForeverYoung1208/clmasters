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
  
  const getVoc = async()=>{
    const [cities, clocks] = await Promise.all([request('/api/cities', 'GET'), request('/api/clocks', 'GET')])
    return { voc:{cities, clocks }}
  }

  const postPreorder = async(preorderData)=>{
    const result = await request('/api/preorder', 'POST', {preorderData} )
    return result
  }
  
  
  return {API:{loginUser, registerUser, getVoc, postPreorder}, isLoading}
}