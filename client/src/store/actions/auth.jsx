import { apiLoginUser, apiRefreshTokens } from "../../shared/js/api"
import { loaderHide, loaderShow, setErrorMessage } from "./main"
import { SET_CURRENT_USER, LOGOUT_USER } from "./actionTypes"
import { LS } from "../../shared/js/ls"

export const authLoginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loaderShow('auth'))
    try {
      const res = await apiLoginUser(credentials)
      res && res.user && res.user.accessToken
        ? dispatch(authSetCurrentUser(res.user))
        : dispatch(setErrorMessage(`login error: ${res?.message}`))
    } catch (error) {
      dispatch(setErrorMessage(`login error: server error`))
    } finally {
      dispatch(loaderHide('auth'))
    }
    
  }
}

export const authAutologinUser = (user) => {
  return async (dispatch) => {
    const { newAccessToken, newRefreshToken }  = await apiRefreshTokens(user)
    dispatch(authSetCurrentUser({
      ...user,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    }))
  }
}

export const authLogoutUser = () => {
  LS.removeItem('user')
	return {
    type: LOGOUT_USER,
    payload: {}
	}    
}

export const authSetCurrentUser = (user) => {
  LS.setItem('user',user)
	return {
    type: SET_CURRENT_USER,
    payload: { user }
	}    
}

