import { TextField } from '@material-ui/core'
import React from 'react'

export const RenderFieldInput = ({
  label,
  input,
  placeholder,
  meta: { touched, error, warning },
}) => {
  const isError = !!(touched && (error || warning))

  const errorText = (error && error) || (warning && warning)
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
