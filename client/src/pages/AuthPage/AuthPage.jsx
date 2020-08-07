import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { AuthContext } from '../../context/contexts';
import { useAPI } from '../../hooks/useAPI';

import './AuthPage.scss'


const AuthPage = () =>{
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })
  const [errorText, setErrorText] = useState()
  const { auth } =useContext(AuthContext)
  const history = useHistory()
  const { API, isLoading } = useAPI({env:process.env.NODE_ENV})

  const changeHandler = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(()=>{
    const t1 = setTimeout(() => {
      setErrorText(null);
    }, 6000);
    return ()=> clearTimeout(t1)
  }, [errorText])

  const submitHandler = async (e) =>{
    e.preventDefault()
    try {
      const user = await API.loginUser(formData)
      auth.login(user)
      history.push('/user')

    } catch (err) {
      console.log('[err]', err);
      setErrorText(err.message);
    }
  }
    
  return(
      <div className='authPage'>
        <Card
          header ="Authentication"
        >
          <Form onSubmit={submitHandler}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={changeHandler}  disabled={isLoading}/>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password"  onChange={changeHandler}  disabled={isLoading}/>

            <Button type="submit" disabled={isLoading}>Login</Button>
            <CSSTransition
              in={!!errorText}
              timeout={300}
              classNames="appear"
            >
              <div className="form__error"> &nbsp; {errorText} </div>
            </CSSTransition>

          </Form>
        </Card>

      </div>
  )
}

export default AuthPage;