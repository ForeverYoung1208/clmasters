import React, { useState } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import { uk } from "date-fns/locale";
import { FieldError } from '../FieldError/FieldError'
import { isSameDay, startOfDay, endOfDay} from 'date-fns'

registerLocale('uk', uk)

export const RenderFieldTime = ({ className, input, placeholder, meta }) => {
  
  const selectedDate = input.value
    ? new Date(input.value)
    : ''
  
  const [minTime, setMinTime] = useState(new Date())
  
  const changeDateHandler = (value) => {
    const _minTime = isSameDay(value, new Date())
      ? new Date()
      : startOfDay(new Date())
    setMinTime( _minTime )
  }
  

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
      minDate={ new Date() }
      minTime={minTime}      
      maxTime={ endOfDay(new Date()) }
      onChange={ changeDateHandler }
    />
  </span>
}