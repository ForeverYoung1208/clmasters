import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { RenderFieldInput } from "../../../../components/Redux-Form/RenderFieldInput/RenderFieldInput";
import { validators } from "../../../../shared/validators/baseValidator";

let UserEditForm = ({ handleSubmit, item: user, initialize }) => {
  useEffect(() => {
    initialize(user)
  }, [initialize, user])

  return (
    <form
      className='items-list__edit-form'
      onSubmit={handleSubmit}
    >
      <span className='items-list__item-field item-tiny'>{user?.id}</span>
      <Field
        name='name'
        component={RenderFieldInput}
        className='items-list__item-field item-medium'
        validate={[ validators.required ]}
      />
      <Field
        name='email'
        component={RenderFieldInput}
        className='items-list__item-field item-wide'
        validate={[ validators.required ]}
      />

      {/* TODO : make boolean!! */}
      <Field
        name='isAdmin'
        component={RenderFieldInput}
        className = 'items-list__item-field item-narrow'
      />
      <button className='items-list__save-button' type='submit'>Save</button>

    </form>
  )
}
export default reduxForm({
  form: 'editUser',
})(UserEditForm)

