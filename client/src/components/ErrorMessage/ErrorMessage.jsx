import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './ErrorMessage.scss';
import { Emptyspace } from '../Emptyspace/Emptyspace';
import { clearErrorMessage } from '../../store/actions/main';
import { useEffect } from 'react';


export const ErrorMessage = (props) => {
  
  const dispatch = useDispatch()
  const { showTime, ..._props } = props
  const errorMessage = useSelector(state => state.main.errorMessage)

  const isMessage = !!errorMessage

  useEffect(() => {
    
    setTimeout(() => {
      dispatch(clearErrorMessage())
    }, showTime)
  }, [isMessage])
  


  return (
    <div {..._props} className = "error-message">
      {errorMessage}
      <Emptyspace/>
    </div>
  )
}