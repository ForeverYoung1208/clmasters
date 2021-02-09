import React, { useCallback, useMemo, useState } from 'react'
import { isSameDay, startOfDay, endOfDay } from 'date-fns'
import { DateTimePicker } from '@material-ui/pickers'
import { FormControl, IconButton, InputAdornment } from '@material-ui/core'
import { AddAlarm as AlarmIcon } from '@material-ui/icons/'

export const RenderFieldTime = ({
  input,
  meta: { touched, error, warning },
}) => {
  const now = useMemo(() => new Date(), [])
  const [minTime, setMinTime] = useState(new Date())
  const maxTime = useMemo(() => endOfDay(new Date()), [])
  
  const [clearedDate, handleClearedDateChange] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date("2019-01-01T18:54"));  

  const isError = useMemo(() => {
    if (!touched) return false
    if (error || warning) return true
    return false
  }, [touched, error, warning])

  const errorText = useMemo(() => {
    if (error) return error
    if (warning) return warning
  }, [error, warning])

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
  
  const dateTransform = useCallback(
    (date) => new Date(date).toLocaleString('uk')
  , [])

  return (
    <FormControl error={isError}>
      <DateTimePicker
        variant="inline"
        autoOk
        disablePast
        hideTabs
        ampm={false}
        value={input.value ? new Date(input.value) : null}
        onChange={changeDateHandler}
        allowKeyboardControl={false}
        minDate={now}
        helperText={errorText}
        minutesStep={60}
        labelFunc={dateTransform}
      />
    </FormControl>
  )
}
