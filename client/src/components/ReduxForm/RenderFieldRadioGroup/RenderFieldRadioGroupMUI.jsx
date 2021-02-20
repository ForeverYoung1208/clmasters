import React from 'react'
// import { RadioButton, RadioGroup } from 'react-radio-buttons'; // _old_
import { FieldError } from '../FieldError/FieldError'
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core'

export const RenderFieldRadioGroup = ({ className, input, meta, options }) => {
  const changeHandler = (selection) => {
    input.onChange(selection)
  }
  return (
    <>
      <RadioGroup onChange={changeHandler} className={className}>
        {options?.map((option) => (
          <FormControlLabel
            key={option.id}
            value={String(option.id)}
            control={<Radio />}
            label={option.name}
          />
        ))}
      </RadioGroup>
      <FieldError meta={meta} />
    </>
  )
}
