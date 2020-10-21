import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { RenderFieldInput } from "../../../../components/ReduxForm/RenderFieldInput/RenderFieldInput";
import { validators } from "../../../../shared/validators/baseValidator";


let CityEditForm = ({ handleSubmit, item: city, initialize }) => {
  useEffect(() => {
    initialize(city)
  }, [initialize, city])

  return (
    <form
      className='items-list__edit-form'
      onSubmit={handleSubmit}
    >
      <span className='items-list__item-field item-tiny'>{city?.id}</span>
      <Field
        name='name'
        component={RenderFieldInput}
        className='items-list__item-field item-medium'
        validate={[ validators.required ]}
      />
      <Field
        name='comment'
        component={RenderFieldInput}
        className='items-list__item-field item-wide'
      />

      <button className='items-list__save-button' type='submit'>Save</button>

    </form>
  )
}
export default reduxForm({
  form: 'editCity',
})(CityEditForm)

