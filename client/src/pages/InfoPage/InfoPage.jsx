import React from 'react';

import './InfoPage.scss';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { useSelector } from 'react-redux';


const InfoPage = () => {
  const {orderResult} = useSelector((store) => store.main)
  return (
    <div className="infoPage">
      <ErrorMessage />
      { orderResult && <div>Your order was placed: {JSON.stringify(orderResult)} </div> }
      <div>You will be able to check orders registered to email (under construction) </div>
      
    </div>
      
  );
};

export default InfoPage;
