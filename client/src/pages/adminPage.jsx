import React from 'react';
import { Card } from '../ui/card';

import './adminPage.scss';

const AdminPage = () => {
    return (
        <div className="adminPage">
          <Card
            header = "Order Page here"
          >  
            Order Page text here
          </Card>
        </div>
    );
};

AdminPage.propTypes = {
    
};

export default AdminPage;
