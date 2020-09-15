import React from 'react';
import { Card } from '../../components/Card/Card';
import { CitiesBlock } from './CitiesBlock/CitiesBlock'
import { MastersBlock } from './MastersBlock/MastersBlock';


import './AdminPage.scss';
import { OrdersBlock } from './OrdersBlock/OrdersBlock';
import { UsersBlock } from './UsersBlock/UsersBlock';

const AdminPage = () => {
    return (
        <div className="adminPage">
          <Card header = "Cities management" >  
            <CitiesBlock/>
          </Card>
          <Card header = "Masters management" >  
            <MastersBlock/>
          </Card>
          <Card header = "Orders management" >  
            <OrdersBlock/>
          </Card>
          <Card header = "Users management" >  
            <UsersBlock/>
          </Card>
        </div>
    );
};

AdminPage.propTypes = {
    
};

export default AdminPage;
