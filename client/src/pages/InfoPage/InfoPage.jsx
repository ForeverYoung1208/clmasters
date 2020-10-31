import React from 'react';

import './InfoPage.scss';
import { ErrorMessageTimeout } from '../../components/ErrorMessage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { OrdersInfo } from './OrdersInfo/OrdersInfo';
import { useState } from 'react';
import { Form } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { clearOrderResult, clearOrders, getOrdersBy, redirectTo } from '../../store/actions/main';


const InfoPage = () => {
  const { orderResult, orders } = useSelector((store) => store.main)
  const [searchString, setSearchString] = useState('')
  const [searchedString, setSearchedString] = useState('')
  const dispatch = useDispatch()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setSearchedString(searchString)
    dispatch(getOrdersBy({ email: searchString }))
  }

  const handleBackToForm = (e) => {
    e.preventDefault()
    dispatch(clearOrderResult())
    dispatch(redirectTo('/masters/preorder'))
  }

  
  return (
    <div className="infoPage">
      <ErrorMessageTimeout showTime={5000} />
      { orderResult &&
        <div className = 'orders-info'>
          <h2>Congratulations! New order registered!</h2>
          <OrdersInfo
            orders={[orderResult]}
          />
          { orderResult.isEmailSent && <h3>(order information was also sent to email)</h3>}
          <Button onClick={ handleBackToForm }>Back to form</Button>
        </div>
      }

      { orders &&
        <div className = 'orders-info'>
        <h2>We've found the next orders with e-mail "{searchedString}":</h2>
          <OrdersInfo
            orders={orders}
          />
          <Button onClick={ () => { dispatch(clearOrders()) } }>Clear information</Button>
        </div>
      }

      { !orderResult &&
        <div className='infoPage__search-email'>
        <Form onSubmit={ handleSearchSubmit }>
          
          <label htmlFor='search-by-email'> Enter email to search for registered orders:</label>
           
          <input
            type= 'text'
            id = 'search-by-email'
            className='form-input'
            onChange={(e) => setSearchString(e.target.value)} value={searchString}
          />
          <Button type='submit'>Search</Button>
        </Form>
        </div>
      }
      
    </div>
      
  );
};

export default InfoPage;
