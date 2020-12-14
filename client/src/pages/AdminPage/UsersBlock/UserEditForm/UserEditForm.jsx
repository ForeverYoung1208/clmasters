import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Field, formValueSelector, reduxForm } from "redux-form"
import { RenderFieldInput } from "../../../../components/ReduxForm/RenderFieldInput/RenderFieldInput"
import { validators } from "../../../../shared/validators/baseValidator"

let UserEditForm = ({
  handleSubmit,
  item: user,
  initialize,
  isAdminValue = false
}) => {
  

  console.log('[isAdminValue]', isAdminValue)

  useEffect(() => {
    if (isAdminValue) {
      initialize({...user, isAdmin:isAdminValue})
    } else {
      initialize(user)
    }
  }, [])
  
  
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
      />
      
      {isAdminValue &&
        <>
          <span>password: </span>
          <Field
            name='password'
            type='password'
            component={RenderFieldInput}
            className='items-list__item-field item-narrow'
            validate={[ validators.required, validators.minLength2 ]}
          />
        </>
      }
      

      <button className='items-list__save-button' type='submit'>Save</button>

    </form>
  )
}

UserEditForm = reduxForm({
  form: 'editUser',
})(UserEditForm)

const selector = formValueSelector('editUser')

UserEditForm = connect(state => {
  const isAdminValue = selector(state, 'isAdmin')
  return {
    isAdminValue
  }
})(UserEditForm)

export default UserEditForm

