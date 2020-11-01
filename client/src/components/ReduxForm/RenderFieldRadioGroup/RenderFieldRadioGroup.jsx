import React from 'react';
import { RadioButton, RadioGroup } from 'react-radio-buttons';
import { FieldError } from '../FieldError/FieldError';

export const RenderFieldRadioGroup = ({ className, input, meta, options }) => {
  const changeHandler = (selection) => {
    input.onChange(selection)
  }
  return (
    <>
      <RadioGroup onChange={changeHandler} className ={className}>
      {
        options?.map((option) =>
          <RadioButton
            key={option.id}
            value={String(option.id)}
            rootColor='#000'
            pointColor='#000'
          >
            {option.name}
          </RadioButton>
        )
      }
      </RadioGroup>
      <FieldError meta={meta}/>
    </>
  )
}