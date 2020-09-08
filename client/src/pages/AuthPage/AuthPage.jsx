import React from 'react'

import { Card } from '../../components/Card/Card';
import AuthForm from './AuthForm/AuthForm';

import './AuthPage.scss'

const AuthPage = () => {
  const submitAuthData = (formData) => {
    console.log('[formData]', formData)
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
