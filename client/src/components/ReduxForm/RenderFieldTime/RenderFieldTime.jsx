import React from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import { uk } from "date-fns/locale";
import { FieldError } from '../FieldError/FieldError'

registerLocale('uk', uk)

export const RenderFieldTime = ({ className, input, placeholder, meta}) => {
  
  const selectedDate = input.value
    ? new Date(input.value)
    : ''

  return <span className='field-wrapper'>
    <FieldError meta={meta}/>
    <ReactDatePicker
      {...input}
      value={selectedDate.toLocaleString('uk')}
      placeholderText={placeholder}
      className={className}
      dateFormat = "dd.MM.yyyy HH:mm"
      locale={uk}
      timeIntervals={ 60 }
      showTimeSelect
      autoComplete="off"
    />
  </span>
}