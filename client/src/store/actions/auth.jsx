import { apiLoginUser, apiRefreshTokens, apiAuthUserByToken } from "../../shared/js/api"
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

export const authAutologinUser = (oldUser) => {
  return async (dispatch) => {

    const user = await apiAuthUserByToken()
    if (user && !user.error) { 
      user.accessToken = oldUser.accessToken   // keep existing tokens
      user.refreshToken = oldUser.refreshToken
      dispatch(authSetCurrentUser(user))
    } else {
      console.log('[user]', user)
      console.log('[oldUser]', oldUser)
      dispatch(authRefreshTokens(oldUser))
    }
  }
}

export const authRefreshTokens = (user) => {
  return async (dispatch) => {

    console.log('[user]', user)
    
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

