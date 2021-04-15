// https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del
// https://blog.prototypr.io/how-to-build-google-login-into-a-react-app-and-node-express-api-821d049ee670
// https://www.npmjs.com/package/google-auth-library#oauth2

import React from 'react'
import { useGoogleLogin, useGoogleLogout } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { authLoginGoogleUser, authLogoutUser } from '../../store/actions/auth'
import { Button } from '../Button/Button'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

export const Login = () => {
  const dispatch = useDispatch()
  const onSuccess = async (googleResult) => {
    console.log('Success: [googleResult]', googleResult)
    dispatch(authLoginGoogleUser(googleResult.tokenId))
  }
  
  const onFailure = (googleResult) => {
    console.log('Fail: [googleResult]', googleResult)
  }

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    // isSignedIn: true,
    accessType: 'offline',
  })

  return <Button onClick={signIn}>Login with Google</Button>
}

export const Logout = () => {
  const dispatch = useDispatch()

  const onLogoutSuccess = () => {
    dispatch(authLogoutUser()) 
    console.log('Logout Success')
  }
  const onFailure = () => {
    console.log('Logout Fails')
  }

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  })

  return <Button onClick={signOut}>Logout</Button>
}
