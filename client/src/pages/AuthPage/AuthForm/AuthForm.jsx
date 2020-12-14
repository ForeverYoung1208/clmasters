import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form } from '../../../components/Form/Form'
import { Button } from '../../../components/Button/Button'
import { validators } from '../../../shared/validators/baseValidator'
import { ErrorMessageTimeout } from '../../../components/ErrorMessage/ErrorMessage'
import { RenderFieldInput } from '../../../components/ReduxForm/RenderFieldInput/RenderFieldInput'

let AuthForm = ({ handleSubmit }) => {
  return (
    <>
      <Form onSubmit={handleSubmit} className="authPage__form">
        <div className="field-wrapper">
          <label htmlFor="email">Email</label>
          <Field
            className="form-input"
            name="email"
            type="email" // placeholder="enter email here"
            component={RenderFieldInput}
            validate={[validators.required, validators.isEmail]}
          />
        </div>

        <div className="field-wrapper">
          <label htmlFor="password">Password</label>
          <Field
            className="form-input"
            name="password"
            type="password" //placeholder="enter password here"
            component={RenderFieldInput}
            validate={[validators.required, validators.minLength2]}
          />
        </div>

        <Button type="submit">Login</Button>
      </Form>
      <ErrorMessageTimeout showTime={5000} />
    </>
  )
}

AuthForm = reduxForm({
  form: 'auth',
})(AuthForm)

export default AuthForm
