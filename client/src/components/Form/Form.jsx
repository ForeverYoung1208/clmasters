import React from "react";
import PT from 'prop-types';
import './Form.scss';

export const Form = (props)=>{
  return(
    <form onSubmit={props.onSubmit} className={'myForm '+props.className} >
      {props.children}
    </form>
  )
}

Form.propTypes = {
  onSubmit: PT.func.isRequired,
}