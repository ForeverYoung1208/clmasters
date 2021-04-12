import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AuthForm from './AuthForm/AuthForm'
import { authLoginUser } from '../../store/actions/auth'
import withCurrentUser from '../../HOC/withCurrentUser'
import { makeStyles } from '@material-ui/core'
import { Login, Logout } from '../../components/GoogleAuth/GoogleAuth'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}))

const AuthPage = ({ currentUser }) => {
  const history = useHistory()
  useEffect(() => {
    currentUser?.email && history.push('/admin')
    // eslint-disable-next-line
  }, [currentUser])

  const dispatch = useDispatch()

  const submitAuthData = (formData) => {
    dispatch(authLoginUser(formData))
  }
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AuthForm onSubmit={submitAuthData} />
      or
      <Login />
      <Logout/> 
    </div>
  )
}

export default withCurrentUser(AuthPage)
