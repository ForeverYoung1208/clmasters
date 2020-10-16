import { apiLoginUser, apiRefreshTokens, apiAuthenticateUser } from "../../shared/js/api"
import { loaderHide, loaderShow, setErrorMessage } from "./main"
import { SET_CURRENT_USER, LOGOUT_USER } from "./actionTypes"
import { LS } from "../../shared/js/ls"

export const authLoginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loaderShow('auth'))
    try {
      const user = await apiLoginUser(credentials)
      user && user.accessToken
        ? dispatch(authSetCurrentUser(user))
        : dispatch(setErrorMessage(`login error: ${user?.error}`))
    } catch (error) {
      dispatch(setErrorMessage(`login error: server error ${JSON.stringify(error)}`))
    } finally {
      dispatch(loaderHide('auth'))
    }
    
  }
}

export const authAutologinUser = () => {
  return async (dispatch) => {
    const user = await apiAuthenticateUser()
    user.accessToken = LS('user').accessToken
    user.refreshToken = LS('user').refreshToken
    user
      ? dispatch(authSetCurrentUser(user))
      : dispatch(authRefreshTokens(user))
  }
}

export const authRefreshTokens = (user) => {
  return async (dispatch) => {
    const { newAccessToken, newRefreshToken } = await apiRefreshTokens(user)
    if (!newAccessToken || !newRefreshToken ) return dispatch(authLogoutUser())
    
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
	}    
}

export const authSetCurrentUser = (user) => {
  LS.setItem('user',user)
	return {
    type: SET_CURRENT_USER,
    user
	}    
}

