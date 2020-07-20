import React, { useState } from 'react'
import { Card } from '../ui/card';

import { useHttp } from '../hooks/useHttp'

import './authPage.scss'

const AuthPage = () =>{
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })
  const {isLoading, request} = useHttp()

  const changeHandler = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async () =>{
    try {
      const data = await request('/api/auth/login', 'POST', JSON.stringify({...formData}) )
      console.log('[data]', data);
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

            <button type="button" onClick={submitHandler} disabled={isLoading}> Submit </button>
          </form>
        </Card>

      </div>
  )
}

export default AuthPage;