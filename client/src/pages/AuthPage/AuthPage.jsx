import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
// import { CSSTransition } from 'react-transition-group';

import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { AuthContext } from '../../context/authContext';
import { loginUser } from '../../shared/js/api';
import withAppear from '../../HOC/withAnimationAppear';

import './AuthPage.scss'



const ErrorMessage = ({errorText}) => (
  <div className="form__error"> &nbsp; {errorText} </div>
)
const AnimatedError = withAppear(ErrorMessage)


const AuthPage = () =>{
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })
  const [errorText, setErrorText] = useState()
  const { auth } =useContext(AuthContext)
  const history = useHistory()
  
  // TODO
  const isLoading = false
  
  const changeHandler = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(()=>{
    const t1 = setTimeout(() => {
      setErrorText(null);
    }, 5000);
    return ()=> clearTimeout(t1)
  }, [errorText])

  const submitHandler = async (e) =>{
    e.preventDefault()
    try {
      const user = await loginUser(formData)
      auth.login(user)
      history.push('/user')
    } catch (err) {
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
            <input className='form-input' type="email" name="email" id="email" onChange={changeHandler}  disabled={isLoading}/>

            <label htmlFor="password">Password</label>
            <input className='form-input' type="password" name="password" id="password"  onChange={changeHandler}  disabled={isLoading}/>

            <Button type="submit" disabled={isLoading}>Login</Button>

            <AnimatedError
              isShown = {!!errorText}
              errorText = {errorText}
            />

          </Form>
        </Card>

      </div>
  )
}

export default AuthPage;
