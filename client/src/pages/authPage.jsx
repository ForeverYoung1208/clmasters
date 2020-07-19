import React from 'react'
import { Card } from '../ui/card';
import PT from 'prop-types';

import './authPage.scss'

const AuthPage = () =>{

  return(
      <div className='authPage'>

        <Card
          header =" Input name, email and password"
        >
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name"/>

            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email"/>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password"/>
          </form>
        </Card>

      </div>
  )
}

AuthPage.propTypes = {
  header: PT.string
}

export default AuthPage;