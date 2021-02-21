import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button } from '../../../components/Button/Button'
import { Form } from '../../../components/Form/Form'
import { RenderFieldInput } from '../../../components/ReduxForm/RenderFieldInput/RenderFieldInputMUI'
import { validators } from '../../../shared/validators/baseValidator'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem',
  },
}))

let EmailSearchForm = ({ handleSubmit, invalid }) => {
  const classes = useStyles()
  return (
    <Box className = {classes.root}>
      <Form onSubmit={handleSubmit}>
        <Typography variant='h6'>
          Search for registered orders by e-mail:
        </Typography>
        <Field
          name="searchString"
          label="Enter e-mail"          
          className={`form-input ${invalid && 'form-input--invalid'}`}
          component={RenderFieldInput}
          validate={[validators.isEmail]}
        />
        <Button type="submit">Search</Button>
      </Form>
    </Box>
  )
}

EmailSearchForm = reduxForm({
  form: 'emailSearch',
})(EmailSearchForm)

export default EmailSearchForm
