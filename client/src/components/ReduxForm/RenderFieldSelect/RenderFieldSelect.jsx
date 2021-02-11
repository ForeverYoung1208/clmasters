import React from 'react'
import { FieldError } from '../FieldError/FieldError'

export const RenderFieldSelect = ({ className, input, placeholder, meta, options }) => {
  const showOptions = [...options]
  return (
    <span className='field-wrapper'>
      <FieldError meta={meta} />
      <select {...input}
        className={className}
        placeholder={placeholder}
      >
        
      <option hidden disabled value={-1}></option>
      {showOptions?.map((o) =>  
        <option key={o.id || o.id===0 || 'empty'} value={o.id}>
          {o.name || o.type}
        </option>
      )}
    </select>
  </span>
  )
}