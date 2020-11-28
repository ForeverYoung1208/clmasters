import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { RenderFieldInput } from "../../../../components/ReduxForm/RenderFieldInput/RenderFieldInput";
import { validators } from "../../../../shared/validators/baseValidator";

import { RenderFieldSelect } from "../../../../components/ReduxForm/RenderFieldSelect/RenderFieldSelect";
import { RenderFieldTime } from "../../../../components/ReduxForm/RenderFieldTime/RenderFieldTime";

let OrderEditForm = ({ handleSubmit, item: order, initialize }) => {
  useEffect(() => {
    // initialize(order)
    order
      ? initialize(order)
      : initialize({
        clockId: -1,
        masterId: -1,
        userId: -1
      })

  }, [initialize, order])

  const { clocks, masters, users } = useSelector((store) => store.admin)
    
  return (
    <form
      className='items-list__edit-form'
      onSubmit={handleSubmit}
    >
      <span className='items-list__item-field item-tiny'>{order?.id}</span>
      <Field
        name='onTime'
        component={RenderFieldTime}
        className='items-list__item-field item-medium'
        validate={[ validators.required ]}
      />
      <Field
        name='clockId'
        component={RenderFieldSelect}
        options={clocks}
        className='items-list__item-field item-narrow'
        validate={[ validators.selected ]}
      />
      <Field
        name='masterId'
        component={RenderFieldSelect}
        options={masters}
        className='items-list__item-field item-medium'
        validate={[ validators.selected ]}
      />
      <Field
        name='userId'
        component={RenderFieldSelect}
        options={users}
        className='items-list__item-field item-narrow'
        validate={[ validators.selected ]}
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
  form: 'editOrder',
})(OrderEditForm)

