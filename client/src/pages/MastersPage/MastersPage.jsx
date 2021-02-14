import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '../../components/Card/Card';
import PreorderForm from './PreorderForm/PreorderForm';
import OrderForm from './OrderForm/OrderForm';
// import { postOrder } from '../../store/actions/main';

import './MastersPage.scss';

const MastersPage = () => {

  const { preorderResult, preorder } = useSelector(state=>state.main)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!preorderResult ) {
      history.push('/masters/preorder')
    } else{
      history.push('/masters/order')
    }
  }, [preorderResult, history])
  
  const handlePostOrder = (masterId) => {
    alert ('dispatch(postOrder({ masterId, preorder }))')
  }

  return (

    <div className="mastersPage">
      <Switch>
        <Route path='/masters/preorder'>
          <Card header = "To help us find a master, please give us some information">  
            <PreorderForm /> 
          </Card>
        </Route>
        <Route path='/masters/order'>
          <Card header="Please choose master and submit your order">  
            <OrderForm
              onSubmit={handlePostOrder}
            />
          </Card>
        </Route>
      </Switch>
    </div>
  );
};

export default MastersPage;
