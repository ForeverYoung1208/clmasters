import { apiLoginUser } from "../../shared/js/api"
import { loaderHide, loaderShow, setErrorMessage } from "./main"
import { SET_CURRENT_USER, LOGOUT_USER } from "./actionTypes"
import { LS } from "../../shared/js/ls"

export const authLoginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loaderShow('auth'))
    try {
      const res = await apiLoginUser(credentials)
      res && res.user && res.user.token
        ? dispatch(setCurrentUser(res.user))
        : dispatch(setErrorMessage(`login error: ${res?.message}`))
    } catch (error) {
      dispatch(setErrorMessage(`login error: server error`))
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
