import React from 'react'
import { reduxForm, Field } from "redux-form"
import { Form } from '../../../components/Form/Form'
import { Button } from '../../../components/Button/Button'
import { isEmail, minLength, required } from "../../../shared/validators/baseValidator";


const renderField = ({ className, input, placeholder, type, meta: { touched, error, warning } }) => (
  <>
    <input {...input} className={className} placeholder={placeholder} type={type} />
    <div className="form__error">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))|| "\u00a0"}
    </div>
  </>
)

const minLength2 = minLength(2)


let AuthForm = (props) => {
  const { handleSubmit } = props
  return (
    <div className='authPage'>
      <Form onSubmit={handleSubmit} className="authPage__form">
        <label htmlFor="email">Email</label>
        <Field className='form-input' name="email" type="email"
          component={renderField}
          validate={[ required, isEmail ]}
        />

        <label htmlFor="password">Password</label>
        <Field className='form-input' name="password" type="password"
          component={renderField}
          validate={[ required, minLength2 ]}
        />

        <Button type="submit" >Login</Button>
      </Form>
    </div>
  )
}

AuthForm = reduxForm({
  form: 'auth'
})(AuthForm)

export default AuthForm