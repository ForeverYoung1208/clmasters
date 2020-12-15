import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { RenderFieldInput } from '../../../../components/ReduxForm/RenderFieldInput/RenderFieldInput'
import { validators } from '../../../../shared/validators/baseValidator'

let UserEditForm = ({ handleSubmit, item: user, initialize }) => {
  const isAdminValue = useSelector(
    (state) => state.form.editUser?.values?.isAdmin
  )

  useEffect(() => {
    initialize({ ...user, password: '' })
    // pass empty dependencies array because we need
    // to initialize form values only once.
    // eslint-disable-next-line
  }, [])

  return (
    <form className="items-list__edit-form" onSubmit={handleSubmit}>
      <span className="items-list__item-field item-tiny">{user?.id}</span>
      <Field
        name="name"
        component={RenderFieldInput}
        className="items-list__item-field item-medium"
        validate={[validators.required]}
      />
      <Field
        name="email"
        component={RenderFieldInput}
        className="items-list__item-field item-wide"
        validate={[validators.required]}
      />

      <Field
        name="isAdmin"
        component={RenderFieldInput}
        type="checkbox"
        className="items-list__item-field item-narrow"
      />

      {isAdminValue && (
        <>
          <span>password: </span>
          <Field
            name="password"
            type="password"
            component={RenderFieldInput}
            className="items-list__item-field item-narrow"
            validate={[validators.required, validators.minLength]}
          />
        </>
      )}

      <button className="items-list__save-button" type="submit">
        Save
      </button>
    </form>
  )
}

UserEditForm = reduxForm({
  form: 'editUser',
})(UserEditForm)

export default UserEditForm
