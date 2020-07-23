import React, { useState, useContext } from 'react'

import { Card } from '../ui/card';
import { useHttp } from '../hooks/useHttp'
import { AuthContext } from '../context/contexts';

import './authPage.scss'

const AuthPage = () =>{
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })
  const { isLoading, request } = useHttp()
  const { auth } =useContext(AuthContext)

  const changeHandler = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async () =>{
    try {
      const { user } = await request('/api/auth/login', 'POST', JSON.stringify({...formData}) )
      auth.login({id:user.id, email:user.email, name:user.name, token:user.token})

    } catch (err) {
      console.log('[err]', err);
    }
  }
    
  return(
      <div className='authPage'>
        <Card
          header ="Authentication"
        >
          <form>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={changeHandler}  disabled={isLoading}/>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password"  onChange={changeHandler}  disabled={isLoading}/>

            <button type="button" onClick={submitHandler} disabled={isLoading}> Login </button>
            <button type="button" onClick={auth.logout} disabled={isLoading}> Logout </button>
          </form>
        </Card>

      </div>
  )
}

export default AuthPage;