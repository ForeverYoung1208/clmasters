import React from 'react'

import { Card } from '../../components/Card/Card';
import AuthForm from './AuthForm/AuthForm';

import './AuthPage.scss'
import { useDispatch } from 'react-redux';
import { authLoginUser } from '../../store/actions/auth';

const AuthPage = () => {
  const dispatch = useDispatch()
  const submitAuthData = (formData) => {
    console.log('[formData]', formData)
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

export default AuthPage;
