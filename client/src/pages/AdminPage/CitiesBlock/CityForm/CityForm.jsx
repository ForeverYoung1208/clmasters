import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import { reduxForm, Field } from 'redux-form'
import { Button } from '../../../../components/Button/Button'
import { RenderFieldInput } from '../../../../components/ReduxForm/RenderFieldInput/RenderFieldInputMUI'

import { validators } from '../../../../shared/validators/baseValidator'
import { RenderFieldCheckbox } from '../../../../components/ReduxForm/RenderFieldCheckbox/RenderFieldCheckboxMUI'

let CityForm = ({ handleSubmit, city, initialize, pristine, submitting }) => {
  useEffect(() => {
    initialize(city)
    // eslint-disable-next-line
  }, [])

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
          <Field label="Comment" name="comment" component={RenderFieldInput} />
        </div>

        <div>
          <Field
            name="isActive"
            label="is Active?"
            component={RenderFieldCheckbox}
          />
        </div>

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
  form: 'city',
})(CityForm)
