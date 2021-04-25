// https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del
// https://blog.prototypr.io/how-to-build-google-login-into-a-react-app-and-node-express-api-821d049ee670
// https://www.npmjs.com/package/google-auth-library#oauth2

import React from 'react'
import { useGoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { authLoginGoogleUser } from '../../store/actions/auth'
import { Button } from '../Button/Button'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

export const LoginWithGoogle = () => {
  const dispatch = useDispatch()
  const onSuccess = async (googleResult) => {
    dispatch(authLoginGoogleUser(googleResult.tokenId))
  }

  const onFailure = (googleResult) => {
    console.log('Fail: [googleResult]', googleResult)
  }

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: false,
    fetchBasicProfile: false,
    accessType: 'offline',
  })

  return <Button onClick={signIn}>Login with Google</Button>
}
