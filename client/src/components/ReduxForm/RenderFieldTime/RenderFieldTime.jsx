import React, { useCallback, useMemo, useState } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import { uk } from 'date-fns/locale'
import { FieldError } from '../FieldError/FieldError'
import { isSameDay, startOfDay, endOfDay } from 'date-fns'

registerLocale('uk', uk)

export const RenderFieldTime = ({ className, input, placeholder, meta }) => {
  const datePickerTimeIntervals = 60
  const now = useMemo(() => new Date(), [])
  const [minTime, setMinTime] = useState(new Date())
  const maxTime = useMemo(() => endOfDay(new Date()), [])

  let selectedDate = ''
  input.value && (selectedDate = new Date(input.value))


  const changeDateHandler = useCallback(
    (value) => {
      if (isSameDay(value, now)) {
        setMinTime(now)
      } else {
        setMinTime(startOfDay(now))
      }
      input.onChange(value)
    },
    [input, now]
  )

  return (
    <span className="field-wrapper">
      <FieldError meta={meta} />
      <ReactDatePicker
        {...input}
        value={selectedDate.toLocaleString('uk')}
        placeholderText={placeholder}
        className={className}
        dateFormat="dd.MM.yyyy HH:mm"
        locale={uk}
        timeIntervals={datePickerTimeIntervals}
        showTimeSelect
        autoComplete="off"
        minDate={now}
        minTime={minTime}
        maxTime={maxTime}
        onChange={changeDateHandler}
      />
    </span>
  )
}
