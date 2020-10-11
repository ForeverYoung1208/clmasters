import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { RenderFieldInput } from "../../../../components/Redux-Form/RenderFieldInput/RenderFieldInput";
import { validators } from "../../../../shared/validators/baseValidator";

import { RenderFieldSelect } from "../../../../components/Redux-Form/RenderFieldSelect/RenderFieldSelect";

const RATINGS = [
  { id: 0, name: 'rating 0' },
  { id: 1, name: 'rating 1' },
  { id: 2, name: 'rating 2' },
  { id: 3, name: 'rating 3' },
  { id: 4, name: 'rating 4' },
  { id: 5, name: 'rating 5' },
]

let MasterEditForm = ({ handleSubmit, item: master, initialize }) => {
  useEffect(() => {
    initialize(master)
  }, [initialize, master])

  const { cities } = useSelector((store) => store.admin)
    
  return (
    <form
      className='items-list__edit-form'
      onSubmit={handleSubmit}
    >
      <span className='items-list__item-field item-tiny'>{master?.id}</span>
      <Field
        name='name'
        component={RenderFieldInput}
        className='items-list__item-field item-medium'
        validate={[ validators.required ]}
      />
      <Field
        name='rating'
        component={RenderFieldSelect}
        options={RATINGS}
        className='items-list__item-field item-medium'
        validate={[ validators.required ]}
      />
      <Field
        name='cityId'
        component={RenderFieldSelect}
        options={cities}
        className='items-list__item-field item-medium'
        validate={[ validators.required ]}
      />
      <Field
        name='comment'
        component={RenderFieldInput}
        className = 'items-list__item-field item-wide'
      />
      <button className='items-list__save-button' type='submit'>Save</button>

    </form>
  )
}
export default reduxForm({
  form: 'editMaster',
})(MasterEditForm)

