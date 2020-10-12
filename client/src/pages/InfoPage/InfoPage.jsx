import React from 'react';

import './InfoPage.scss';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { OrdersInfo } from './OrdersInfo/OrdersInfo';
import { useState } from 'react';
import { Form } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { clearOrderResult } from '../../store/actions/main';


const InfoPage = () => {
  const { orderResult } = useSelector((store) => store.main)
  const { name, email } = useSelector((store) => store.main.preorder)
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    console.log('handleSearchSubmit '+ searchValue)
  }
  
  return (
    <div className="infoPage">
      <ErrorMessage />
      { orderResult &&
        <div className = 'orders-info'>
          <h2>Congratulations! New order registered!</h2>
        <OrdersInfo
          orders={[orderResult]}
          name={name}
          email={email}
        />
        <Button onClick={ () => { dispatch(clearOrderResult()) } }>Dismiss</Button>
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
