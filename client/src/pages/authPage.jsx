import React, { useState } from 'react'
import { Card } from '../ui/card';
import PT from 'prop-types';

import './authPage.scss'

const AuthPage = () =>{
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })

  const changeHandler = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  


  return(
      <div className='authPage'>

        <Card
          header ="Authentication"
        >
          <form>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={changeHandler}/>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password"  onChange={changeHandler}/>

            <button type="button"> Submit </button>
          </form>
        </Card>

      </div>
  )
}

AuthPage.propTypes = {
  header: PT.string
}

export default AuthPage;