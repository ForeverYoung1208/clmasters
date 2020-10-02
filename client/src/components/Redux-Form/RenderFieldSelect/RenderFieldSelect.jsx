import React from 'react'
import { FieldError } from '../FieldError/FieldError'

export const RenderFieldSelect = ({ className, input, placeholder, meta, options }) => {
  const showOptions = [{ id:''}, ...options]
  return (
  <span className = 'field-wrapper'>
    <FieldError meta={meta}/>
    <select {...input} className={className} placeholder={placeholder}>
      {showOptions?.map((o) =>  
        <option key={o.id || 'empty'} value={o.id}>
          {o.name || o.type}
        </option>
      )}
    </select>
  </span>
  )
}