import { apiLoginUser } from "../../shared/js/api"
import { loaderHide, loaderShow } from "./main"
import { SET_CURRENT_USER, LOGIN_USER_ERROR, LOGOUT_USER } from "./actionTypes"
import { LS } from "../../shared/js/ls"

export const authLoginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loaderShow('auth'))
    try {
      const res = await apiLoginUser(credentials)
      res && res.user && res.user.token
        ? dispatch(setCurrentUser(res.user))
        : dispatch(loginError(`login error: ${res?.message}`))
    } catch (error) {
      dispatch(loginError(`login error: server error`))
    } finally {
      dispatch(loaderHide('auth'))
    }
    
  }
}

export const authLogoutUser = () => {
  LS.removeItem('userData')
	return {
    type: LOGOUT_USER,
    payload: {}
	}    
}

export const setCurrentUser = (user) => {
  LS.setItem(user)
	return {
    type: SET_CURRENT_USER,
    payload: { user }
	}    
}

const loginError = (message) => {
  console.log('[loginError]', message)
  return {
    type: LOGIN_USER_ERROR,
    payload: { message }
	}  
}