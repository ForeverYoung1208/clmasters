import React from 'react';

import { useContext } from 'react';
import { GlobalDataContext } from '../../context/globalDataContext';
import './ErrorMessage.scss';


export const ErrorMessage = (props) => {

  const {globalData} = useContext(GlobalDataContext)
  const errorMessage = globalData?.error || ''

  return (
    <div {...props} className = "error-message">
      {errorMessage}
    </div>
  );
};