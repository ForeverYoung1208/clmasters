import React, { useCallback, useMemo } from 'react'
import { DateTimePicker } from '@material-ui/pickers'
import { startOfDay, startOfHour, addHours } from 'date-fns'
import { FormControl } from '@material-ui/core'

export const RenderFieldTime = ({
  label,
  input,
  meta: { touched, error, warning },
}) => {
  const now = useMemo(() => startOfHour(addHours(new Date(), 1)), [])

  const isError = useMemo(() => {
    if (!touched) return false
    if (error || warning) return true
    return false
  }, [touched, error, warning])

  const errorText = useMemo(() => {
    if (error) return error
    if (warning) return warning
  }, [error, warning])

  const dateTransform = useCallback((date) => {
    if (date) return new Date(date).toLocaleString('uk')
    return ''
  }, [])
  
  return (
    <FormControl margin="normal">
      <DateTimePicker
        error={isError}
        views={["date","hours"]}
        label={label}
        variant="inline"
        autoOk
        disablePast
        hideTabs
        ampm={false}
        value={input.value ? new Date(input.value) : now}
        onChange={input.onChange}
        allowKeyboardControl={false}
        minDate={startOfDay(now)}
        helperText={errorText}
        minutesStep={60}
        labelFunc={dateTransform}
      />
    </FormControl>
  )
}
