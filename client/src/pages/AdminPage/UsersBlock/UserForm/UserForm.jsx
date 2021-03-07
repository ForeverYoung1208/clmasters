import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import { reduxForm, Field } from 'redux-form'
import { Button } from '../../../../components/Button/Button'
import { RenderFieldInput } from '../../../../components/ReduxForm/RenderFieldInput/RenderFieldInputMUI'
import { RenderFieldCheckbox } from '../../../../components/ReduxForm/RenderFieldCheckbox/RenderFieldCheckboxMUI'

import { validators } from '../../../../shared/validators/baseValidator'
import { useSelector } from 'react-redux'

export const RATINGS = [
  { id: '1', name: 'rating 1' },
  { id: '2', name: 'rating 2' },
  { id: '3', name: 'rating 3' },
  { id: '4', name: 'rating 4' },
  { id: '5', name: 'rating 5' },
]

let UserForm = ({ handleSubmit, user, initialize, pristine, submitting }) => {
  useEffect(() => {
    initialize({ ...user, password: '' })
    // eslint-disable-next-line
  }, [])
  const isAdmin = useSelector(({ form: { user } }) => user?.values?.isAdmin)

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="name"
            label="Name"
            component={RenderFieldInput}
            validate={[validators.required]}
          />
        </div>
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
            name="isAdmin"
            label="is Admin?"
            component={RenderFieldCheckbox}
          />
        </div>
        {isAdmin && (
          <div>
            <Field
              name="password"
              label="Password"
              type="password"
              component={RenderFieldInput}
              validate={[validators.required, validators.minLength2]}
            />
          </div>
        )}

        <Box display="flex" justifyContent="center">
          <Button
            color="primary"
            type="submit"
            disabled={pristine || submitting}
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  )
}
export default reduxForm({
  form: 'user',
})(UserForm)
