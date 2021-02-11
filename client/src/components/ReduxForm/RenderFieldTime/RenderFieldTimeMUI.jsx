import React, { useCallback, useMemo, useState } from 'react'
import { isSameDay, startOfDay, endOfDay } from 'date-fns'
import { DateTimePicker } from '@material-ui/pickers'
import { FormControl, IconButton, InputAdornment } from '@material-ui/core'
import { AddAlarm as AlarmIcon } from '@material-ui/icons/'

export const RenderFieldTime = ({
  label,
  input,
  meta: { touched, error, warning },
}) => {
  const now = useMemo(() => new Date(), [])

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
    <FormControl error={isError} margin="normal">
      <DateTimePicker
        label={label}
        variant="inline"
        autoOk
        disablePast
        hideTabs
        ampm={false}
        value={input.value ? new Date(input.value) : null}
        onChange={input.onChange}
        allowKeyboardControl={false}
        minDate={now}
        helperText={errorText}
        minutesStep={60}
        labelFunc={dateTransform}
      />
    </FormControl>
  )
}
