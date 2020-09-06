import React from 'react';
import { useSelector } from 'react-redux'
import './ErrorMessage.scss';


export const ErrorMessage = (props) => {

  const error = useSelector(state=>state.main.error)

  return (
    <div {...props} className = "error-message">
      {error?.message}
    </div>
  );
};