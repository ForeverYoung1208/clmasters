import React, { useEffect } from "react";
import { useCallback } from "react";
import { Field, reduxForm } from "redux-form";
import { RenderFieldInput } from "../../../../components/ReduxForm/RenderFieldInput/RenderFieldInput";
import { validators } from "../../../../shared/validators/baseValidator";

let UserEditForm = ({ handleSubmit, item: user, initialize }) => {
  useEffect(() => {
    initialize(user)
  }, [initialize, user])

  const changeIsAdminHandler = useCallback((e, newValue, previousValue, name) => {
    if (previousValue === false && newValue === true) {
      prompt('provide password')
    }
  },[])

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

      <Field
        name='isAdmin'
        component={RenderFieldInput}
        type = 'checkbox'
        className='items-list__item-field item-narrow'
        onChange = {changeIsAdminHandler}
      />

      <button className='items-list__save-button' type='submit'>Save</button>

    </form>
  )
}
export default reduxForm({
  form: 'editUser',
})(UserEditForm)

