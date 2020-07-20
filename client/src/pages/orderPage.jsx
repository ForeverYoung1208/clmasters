import React from 'react';
import { Card } from '../ui/card';

import './orderPage.scss';

const OrderPage = () => {
    return (
        <div className="orderPage">
          <Card
            header = "Order Page here"
          >  
            Order Page text here
          </Card>
        </div>
    );
};

OrderPage.propTypes = {
    
};

export default OrderPage;
