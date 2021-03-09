import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form } from '../../../components/Form/Form'
import { Button } from '../../../components/Button/Button'
import { validators } from '../../../shared/validators/baseValidator'
import { ErrorMessageTimeout } from '../../../components/ErrorMessage/ErrorMessage'
import { RenderFieldInput } from '../../../components/ReduxForm/RenderFieldInput/RenderFieldInputMUI'
import { Box, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: '1rem',
    borderRadius: 4,
    boxShadow: '0px 1px 4px 0px',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}))

let AuthForm = ({ handleSubmit }) => {
  const classes=useStyles()
  return (
    <Box className={classes.root}>
      <Typography variant="h6">
        Login credentials
      </Typography>      
      <Form onSubmit={handleSubmit}>
        <div>
          <Field
            name="email"
            label="E-mail"
            component={RenderFieldInput}
            validate={[validators.required, validators.isEmail]}
          />
        </div>

        <div>
          <Field
            name="password"
            type="password"
            label="Password"
            component={RenderFieldInput}
            validate={[validators.required, validators.minLength2]}
          />
        </div>

        <Button type="submit">Login</Button>
      </Form>
      <ErrorMessageTimeout showTime={5000} />
    </Box>
  )
}

AuthForm = reduxForm({
  form: 'auth',
})(AuthForm)

export default AuthForm
