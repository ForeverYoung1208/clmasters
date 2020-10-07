import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Card } from '../../components/Card/Card';
import { PreorderForm } from './PreorderForm/PreorderForm';

import './MastersPage.scss';
import OrderForm from './OrderForm/OrderForm';

const MastersPage = () => {

  const { preorderResult } = useSelector(state=>state.main)
  const history = useHistory()

  useEffect(()=>{
    if(!preorderResult ) {  //|| !preorderResult[0]
      history.push('/masters/preorder')
    } else{
      history.push('/masters/order')
    }
  },[preorderResult, history])

  return (

    <div className="mastersPage">
      <Switch>
        <Route path='/masters/preorder'>
          <Card header = "To help us find a master, please give us some information">  
            <PreorderForm /> 
          </Card>
        </Route>
        <Route path='/masters/order'>
          <Card header="Please check and submit your order">  
            <OrderForm onSubmit={(val) => {console.log(val)}} />
          </Card>
        </Route>
      </Switch>
    </div>
  );
};

export default MastersPage;



// <Route path='/masters/order'>
// <Card header="Order confirmation will be here">  
  
//   <div> 
//     preorder data:
//     {JSON.stringify(preorder)}
//   </div>
//   <br/>

//   <div>
//     got preorder results:
//     {JSON.stringify(preorderResult)}
//   </div>

//     <NavLink
//       to='/masters/preorder'
//     > 
//       <Button> 
//         Change preorder data
//       </Button>
//     </NavLink> 
    
// </Card>
// </Route>