import React, { useEffect } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Button } from '../../../../components/Button/Button'
import { RenderFieldInput } from '../../../../components/ReduxForm/RenderFieldInput/RenderFieldInputMUI'

import { validators } from '../../../../shared/validators/baseValidator'

let CityEditForm = ({ handleSubmit, city, initialize }) => {
  useEffect(() => {
    initialize(city)
    // eslint-disable-next-line
  }, [])

  return (
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

      <Button color='primary' type="submit">Save</Button>
    </form>
  )
}
export default reduxForm({
  form: 'editCity',
})(CityEditForm)
