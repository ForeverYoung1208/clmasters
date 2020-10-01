import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { uk } from "date-fns/locale";
import { Field, reduxForm } from "redux-form";
import { validators } from "../../../../shared/validators/baseValidator";

import './OrderEditForm.scss'

registerLocale('uk', uk)

const FieldError = ({ meta: { touched, error, warning } }) => (
  <>
    { touched && (error || warning) &&
      <div className="form__error">
        {(error && <span>{error}</span>) || (warning && <span>{warning}</span>)}
      </div>
    }
  </>
)

const renderFieldInput = ({ className, input, placeholder, type, meta}) => (
  <span className = 'field-wrapper'>
    
    <input {...input} className={className} placeholder={placeholder} type={type} />
  </span>
)

const renderFieldTime = ({ className, input, placeholder, meta}) => (
  <span className='field-wrapper'>
    <FieldError meta={meta}/>
    <ReactDatePicker
      {...input}
      selected={Date.parse(input.value) || null}
      placeholderText={placeholder}
      // className={className + (meta.error ? ' react-datepicker__error' : '')}
      className={className}
      dateFormat = "dd.MM.yyyy HH:mm"
      locale={uk}
      timeIntervals={ 60 }
      showTimeSelect
      autoComplete="off"
    />
  </span>
)

const renderFieldSelect = ({ className, input, placeholder, meta, options }) => {
  const showOptions = [{ id:''}, ...options]
  return (
  <span className = 'field-wrapper'>
    <FieldError meta={meta}/>
    <select {...input} className={className} placeholder={placeholder}>
      {showOptions?.map((o) =>  
        <option key={o.id || 'empty'} value={o.id}>
          {o.name || o.type}
        </option>
      )}
    </select>
  </span>
  )
}

let OrderEditForm = ({ handleSubmit, item: order, initialize }) => {
  useEffect(() => {
    initialize(order)
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
        component={renderFieldTime}
        className='items-list__item-field item-medium'
        validate={[ validators.required ]}
      />
      <Field
        name='clockId'
        component={renderFieldSelect}
        options={clocks}
        className='items-list__item-field item-narrow'
        // validate={[ validators.required ]}
      />
      <Field
        name='masterId'
        component={renderFieldSelect}
        options={masters}
        className='items-list__item-field item-medium'
        validate={[ validators.required ]}
      />
      <Field
        name='userId'
        component={renderFieldSelect}
        options={users}
        className='items-list__item-field item-narrow'
        validate={[ validators.required ]}
      />
      <Field
        name='comment'
        component={renderFieldInput}
        className = 'items-list__item-field item-wide'
      />
      <button className='items-list__save-button' type='submit'>Save</button>
      {/* <button className='items-list__cancel-button' type='button'>Cancel</button> */}
      

    </form>
  )
}
export default reduxForm({
  form: 'editOrder',
})(OrderEditForm)

