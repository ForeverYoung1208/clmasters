import React from 'react';

import './InfoPage.scss';
import { ErrorMessageWithTimeout as ErrorMessage
 } from '../../components/ErrorMessage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { OrdersInfo } from './OrdersInfo/OrdersInfo';
import { useState } from 'react';
import { Form } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { clearOrderResult, clearOrders, getOrdersBy } from '../../store/actions/main';


const InfoPage = () => {
  const { orderResult, orders } = useSelector((store) => store.main)
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    dispatch(getOrdersBy({ email: searchValue }))
    
  }
  
  return (
    <div className="infoPage">
      <ErrorMessage />
      { orderResult &&
        <div className = 'orders-info'>
          <h2>Congratulations! New order registered!</h2>
          <OrdersInfo
            orders={[orderResult]}
          />
          { orderResult.isEmailSent && <h3>(order information was also sent to email)</h3>}
          <Button onClick={ () => { dispatch(clearOrderResult()) } }>Dismiss</Button>
        </div>
      }

      { orders &&
        <div className = 'orders-info'>
        <h2>We've found the next orders with e-mail "{searchValue}":</h2>
          <OrdersInfo
            orders={orders}
          />
          <Button onClick={ () => { dispatch(clearOrders()) } }>Dismiss</Button>
        </div>
      }

      { !orderResult &&
        <div className='infoPage__search-email'>
        <Form onSubmit={handleSearchSubmit}>
          
          <label htmlFor='search-by-email'> Enter email to search for registered orders:</label>
           
          <input
            type= 'text'
            id = 'search-by-email'
            className='form-input'
            onChange={(e) => setSearchValue(e.target.value)} value={searchValue}
          />
          <Button type='submit'>Search</Button>
        </Form>
        </div>
      }
      
    </div>
      
  );
};

export default InfoPage;
