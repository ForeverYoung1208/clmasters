import React from 'react'
import { reduxForm, Field } from "redux-form"
import { Form } from '../../../components/Form/Form'
import { Button } from '../../../components/Button/Button'
import { validators } from "../../../shared/validators/baseValidator";
import { Emptyspace } from '../../../components/Emptyspace/Emptyspace';
import { ErrorMessageTimeout } from '../../../components/ErrorMessage/ErrorMessage';


const renderField = ({ className, input, placeholder, type, meta: { touched, error, warning } }) => (
  <>
    <input {...input} className={className} placeholder={placeholder} type={type} />
    <div className="form__error">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      <Emptyspace/>
    </div>
  </>
)

const minLength2 = validators.minLength(2)


let AuthForm = ({ handleSubmit }) => {
  return (
    <div className='authPage'>
      <Form onSubmit={handleSubmit} className="authPage__form">
        <label htmlFor="email">Email</label>
        <Field className='form-input' name="email" type="email" // placeholder="enter email here"
          component={renderField}
          validate={[ validators.required, validators.isEmail ]}
        />

        <label htmlFor="password">Password</label>
        <Field className='form-input' name="password" type="password" //placeholder="enter password here"
          component={renderField}
          validate={[ validators.required, minLength2 ]}
        />

        <Button type="submit" >Login</Button>
      </Form>
      <ErrorMessageTimeout showTime={5000}/>
    </div>
  )
}

AuthForm = reduxForm({
  form: 'auth'
})(AuthForm)

export default AuthForm