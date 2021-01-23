import { TextField } from '@material-ui/core'
import React, { useMemo } from 'react'

export const RenderFieldInput = ({
  label,
  input,
  placeholder,
  meta: { touched, error, warning },
}) => {
  const isError = useMemo(() => {
    return !!(touched && (error || warning))
  }, [touched, error, warning])

  const errorText = useMemo(() => {
    return (error && error) || (warning && warning)
  }, [error, warning])
  
  return (
    <span className="field-wrapper">
      <TextField
        {...input}
        margin="normal"
        error={isError}
        label={label}
        helperText={errorText}
        placeholder={placeholder}
      />
    </span>
  )
}
