import React, { useEffect, useContext } from 'react';
import { Switch, Route, useHistory, NavLink } from 'react-router-dom';

import { Card } from '../../components/Card/Card';
import { PreorderForm } from './PreorderForm/PreorderForm';
import { GlobalDataContext } from '../../context/globalDataContext';
import { Button } from '../../components/Button/Button';

import './MastersPage.scss';


const MastersPage = () => {

  const {globalData, setGlobalData} = useContext(GlobalDataContext)
  const preorderResult = globalData?.preorderResult
  const history = useHistory()

  useEffect(()=>{
    if(!preorderResult) {
      history.push('/masters/preorder')
    } else{
      console.log('[preorderResult]', preorderResult)
      history.push('/masters/order')
    }
  },[preorderResult])


  return (

    <div className="mastersPage">
      <Switch>
        <Route path='/masters/preorder'>
          <Card header = "To help us find a master, please give us some information">  
            <PreorderForm/> 
          </Card>
        </Route>
        <Route path='/masters/order'>
          <Card header = "Order confirmation will be here">  
            <div> 
              preorder data:
              {JSON.stringify(globalData?.preorder)}
            </div>
            <br/>

            <div>
              got preorder results:
              {JSON.stringify(preorderResult)}
  
            </div>


            
              <NavLink
                to='/masters/preorder'
              > 
                <Button> 
                  Change preorder data
                </Button>
              </NavLink> 
            

          </Card>
        </Route>

      </Switch>
  
  

    </div>
  );
};

MastersPage.propTypes = {
    
};

export default MastersPage;
