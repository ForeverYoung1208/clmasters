import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { HiX } from "react-icons/hi";

import { clearErrorMessage } from '../../store/actions/main';
import { useEffect } from 'react';

import './ErrorMessage.scss';
import { useCallback } from 'react';

export const ErrorMessageWithTimeout = ({ showTime, ..._props }) => {
  const dispatch = useDispatch()
  const errorMessage = useSelector(({ main: { errorMessage } }) => errorMessage)
  const isMessage = !!errorMessage
  useEffect(() => {
    setTimeout(() => {
      dispatch(clearErrorMessage())
    }, showTime)
  }, [isMessage, dispatch, showTime])
  return (
    <div {..._props} className = "error-message">
      { !!errorMessage && errorMessage}
    </div>
  )
}

export const ErrorMessageWithButton = ({ showTime, ..._props }) => {
  
  const dispatch = useDispatch()
  const errorMessage = useSelector(({ main: { errorMessage } }) => errorMessage)

  const handleDismissClick = useCallback(
    () => dispatch(clearErrorMessage())
  ,[dispatch])
  
  return (
    <div {..._props} className="error-message">
      <span>{ !!errorMessage && errorMessage}</span>
      {errorMessage
        && <button onClick={handleDismissClick}><HiX/></button>
      }
    </div>
  )
}