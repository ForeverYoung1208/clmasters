import { apiLoginUser } from "../../shared/js/api"
import { loaderHide, loaderShow, setErrorMessage } from "./main"
import { SET_CURRENT_USER, LOGOUT_USER } from "./actionTypes"
import { LS } from "../../shared/js/ls"

export const authLoginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loaderShow('auth'))
    try {
      const user = await apiLoginUser(credentials)
      if (user?.accessToken){
        LS.setItem('user', user)
        dispatch(authSetCurrentUser(user))
      } else {
        dispatch(setErrorMessage(`login errors: ${JSON.stringify(user)}`))
      }

    } catch (error) {
      dispatch(setErrorMessage(`login error: server error ${JSON.stringify(error)}`))
    } finally {
      dispatch(loaderHide('auth'))
    }
    
  }
}


export const authLogoutUser = () => {
  LS.removeItem('user')
	return {
    type: LOGOUT_USER,
	}    
}

export const authSetCurrentUser = (user) => {
	return {
    type: SET_CURRENT_USER,
    user
	}    
}

