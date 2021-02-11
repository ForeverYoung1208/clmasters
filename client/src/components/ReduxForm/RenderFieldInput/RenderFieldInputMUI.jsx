import { TextField } from '@material-ui/core'
import React, { useMemo } from 'react'

export const RenderFieldInput = ({
  label,
  input,
  placeholder,
  meta: { touched, error, warning },
}) => {
  const isError = useMemo(() => {
    if (!touched) return false
    if (error || warning) return true
    return false
  }, [touched, error, warning])

  const errorText = useMemo(() => {
    if (error) return error
    if (warning) return warning
  }, [error, warning])

  return (
    <TextField
      {...input}
      margin="normal"
      error={isError}
      label={label}
      helperText={errorText}
      placeholder={placeholder}
    />
  )
}
