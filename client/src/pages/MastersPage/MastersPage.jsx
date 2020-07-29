import React from 'react';
import { Card } from '../../components/Card/Card';

import './MastersPage.scss';

const OrderPage = () => {
    return (
        <div className="mastersPage">
          <Card
            header = "Masters Page here"
          >  
            Masters Page text here
          </Card>
        </div>
    );
};

OrderPage.propTypes = {
    
};

export default OrderPage;
