import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AuthForm from './AuthForm/AuthForm';
import { Card } from '../../components/Card/Card';
import { authLoginUser } from '../../store/actions/auth';
import withCurrentUser from '../../HOC/withCurrentUser'

import './AuthPage.scss'

const AuthPage = (props) => {
  const { currentUser } = props
  const history = useHistory()

  useEffect(() => {
    currentUser?.email && history.push('/admin')
    // eslint-disable-next-line
  }, [currentUser])

  const dispatch = useDispatch()
  
  const submitAuthData = (formData) => {
    dispatch(authLoginUser(formData))
  }

  return (
    < div className='authPage' >
      <Card
        header="Authentication"
      >
        <AuthForm onSubmit={submitAuthData} />
      </Card>
    </div >
  )
}

export default withCurrentUser(AuthPage);
