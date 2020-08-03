import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';

import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
// import { useHttp } from '../../hooks/useHttp'
import { AuthContext } from '../../context/contexts';
import { useAPI } from '../../hooks/useAPI';

import './AuthPage.scss'

const AuthPage = () =>{
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })
  const { auth } =useContext(AuthContext)
  const history = useHistory()
  const {API, isLoading} = useAPI({env:process.env.NODE_ENV})

  const changeHandler = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async (e) =>{
    e.preventDefault()
    try {
      
      const user = await API.loginUser(formData)
      console.log('[user]', user);

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
          <form onSubmit={submitHandler}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={changeHandler}  disabled={isLoading}/>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password"  onChange={changeHandler}  disabled={isLoading}/>

            <Button type="submit" disabled={isLoading}>Login</Button>
          </form>
        </Card>

      </div>
  )
}

export default AuthPage;