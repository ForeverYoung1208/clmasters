import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { HiX } from "react-icons/hi";

import { clearErrorMessage } from '../../store/actions/main';
import { useEffect } from 'react';

import './ErrorMessage.scss';
import { useCallback } from 'react';


export const ErrorMessageTimeout = ({ showTime, customErrorMessage, ..._props }) => {
  const dispatch = useDispatch()
  const errorMessage = useSelector(({ main: { errorMessage } }) => errorMessage)
  const isMessage = !!errorMessage
  
  useEffect(() => {
    setTimeout(() => {
      dispatch(clearErrorMessage())
    }, showTime)
  // we should react only to isMessage to prevent multiple timers
  // eslint-disable-next-line    
  }, [isMessage])

  return (
    <div {..._props} className = "error-message">
      { isMessage && (customErrorMessage||errorMessage)}
    </div>
  )
}


export const ErrorMessageButton = ({ showTime, customErrorMessage, ..._props }) => {
  
  const dispatch = useDispatch()
  const errorMessage = useSelector(({ main: { errorMessage } }) => errorMessage)
  const isMessage = !!errorMessage

  const handleDismissClick = useCallback(
    () => dispatch(clearErrorMessage())
  ,[dispatch])
  
  return (
    <div {..._props} className="error-message">
      <span>{ isMessage && (customErrorMessage||errorMessage)}</span>
      {errorMessage
        && <button onClick={handleDismissClick}><HiX/></button>
      }
    </div>
  )
}