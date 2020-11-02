import React from "react";
import { FieldError } from "../FieldError/FieldError";

export const RenderFieldInput = ({ className, input, placeholder, type, meta }) => {
  const { touched, error, warning } = meta
  const classInvalid = touched && (error || warning) ? ' form-input--invalid' : ''
  return (
    <span className = 'field-wrapper'>
      <FieldError meta={meta}/>
      <input
        {...input}
        className={className + classInvalid}
        placeholder={placeholder}
        type={type}
      />
    </span>
  )
}