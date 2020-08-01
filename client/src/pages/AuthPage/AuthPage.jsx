import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';

import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { useHttp } from '../../hooks/useHttp'
import { AuthContext } from '../../context/contexts';

import './AuthPage.scss'

const AuthPage = () =>{
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })
  const { isLoading, request } = useHttp({env:process.env.NODE_ENV})
  const { auth } =useContext(AuthContext)
  const history = useHistory()

  const changeHandler = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async () =>{
    try {
      const { user } = await request('/api/auth/login', 'POST', JSON.stringify({...formData}) )
      auth.login(user)
      history.push('/user')

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

            <Button type="button" onClick={submitHandler} disabled={isLoading}>Login</Button>
            {/* <button type="button" onClick={auth.logout} disabled={isLoading}> Logout </button> */}
          </form>
        </Card>

      </div>
  )
}

export default AuthPage;