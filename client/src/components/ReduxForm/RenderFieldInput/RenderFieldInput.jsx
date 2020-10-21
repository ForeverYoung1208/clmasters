import React from "react";
import { FieldError } from "../FieldError/FieldError";

export const RenderFieldInput = ({ className, input, placeholder, type, meta }) => (
  <span className = 'field-wrapper'>
    <FieldError meta={meta}/>
    <input {...input} className={className} placeholder={placeholder} type={type} />
  </span>
)